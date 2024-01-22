import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import EachQuestionEvaluation from "../../component/EachQuestionEvaluation";
import UserSocre from "./userSocre";
import LoaderSpinner from "../../component/LoaderSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [question, setQuestionData] = useState([]);
  const [userAns, setUserAns] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const data = JSON.parse(localStorage.getItem("userData"));
  // use effect
  useEffect(() => {
    // Retrieving object from local storage

    setUserEmail(data.user.email);
    fecthAllusers();
    var langaugeName = localStorage.getItem("langaugeName");
    if (langaugeName !== null) {
      setName(langaugeName);
      setUserEmail(data.user.email);
    } else {
      console.log("Langauge not found in local storage");
    }

    if (langaugeName !== null) {
      fetchQuestionData(langaugeName);
      compareAns();
    }
  }, []);

  const fetchQuestionData = async (name) => {
    try {
      const data = await axios.get(
        `${BaseUrl}/api/questions/getall-question/category/${name}`
      );

      if (data) {
        setQuestionData(data.data.question);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // comparing the ans
  const compareAns = async () => {
    try {
      let userAns = localStorage.getItem("userAns");
      let getData = JSON.parse(userAns);
      // Use the array
      setUserAns(getData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  // all users
  const fecthAllusers = async () => {
    setLoader(true);
    try {
      const data = await axios.get(`${BaseUrl}/api/users/performance`);
      setAllUsers(data.data.allusers.sort((a, b) => b.ansNumber - a.ansNumber));
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Reset user preferences
  const userReset = async () => {
    try {
      const user = await axios.delete(`${BaseUrl}/api/users/reset-progress`, {
        data: {
          email: data.user.email,
        },
      });
      if (!user) {
        toast.error("User not Reset");
      } else {
        toast.success(user.data.message);
        navigate(`/quiz/${name}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {loader ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="container-flui m-3 p-3 dashboard">
            <div className="row">
              <div className="col-md-8">
                <div className="card w-100 p-3">
                  <h1 className="text-uppercase text-center fs-bold">
                    {name} Quiz
                  </h1>
                  {question?.map((data, i) => (
                    <EachQuestionEvaluation
                      key={i}
                      data={data}
                      number={i + 1}
                      check={data.ans === userAns[i].ans}
                      userAns={userAns[i].ans}
                    />
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <div className=" card p-3">
                  <div>
                    <h3 className="text-center">User Performance</h3>
                    <div
                      className="border rounded p-3 mb-3 border-secondary-subtle"
                      style={{ background: "#eeeeee" }}
                    >
                      <div className=" userTable d-flex justify-content-center align-items-center gap-2 fw-bold">
                        <div>Rank</div>
                        <div className="name">Name</div>
                        <div>Score</div>
                      </div>
                      {allUsers?.map((user, i) => (
                        <>
                          <UserSocre
                            key={i}
                            name={user.name}
                            rank={i + 1}
                            score={user.ansNumber}
                            email={userEmail === user.email}
                          />
                        </>
                      ))}
                      <div className="text-center mt-2">
                        <button onClick={userReset} className="btn btn-primary">
                          Reset Progress
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDashboard;
