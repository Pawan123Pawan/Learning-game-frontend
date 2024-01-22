import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import EachQuestionEvaluation from "../../component/EachQuestionEvaluation";
import UserSocre from "./UserSocre";
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

  useEffect(() => {
    fecthAllusers();
    // Retrieving object from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserEmail(userData.user.email);

    const langaugeName = localStorage.getItem("langaugeName");
    if (langaugeName !== null) {
      setName(langaugeName);
      setUserEmail(userData.user.email);
      fetchQuestionData(langaugeName);
      compareAns();
    } else {
      console.log("Language not found in local storage");
    }
  }, []);

  const fetchQuestionData = async (name) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/questions/getall-question/category/${name}`
      );
      // console.log(response.data.question[0].ans, "category");

      if (response.data) {
        setQuestionData(response.data.question);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const compareAns = () => {
    try {
      const userAnsData = localStorage.getItem("userAns");
      const parsedUserAns = JSON.parse(userAnsData);
      setUserAns(parsedUserAns);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const fecthAllusers = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`${BaseUrl}/api/users/performance`);
      setAllUsers(
        response.data.allusers.sort((a, b) => b.ansNumber - a.ansNumber)
      );
      setLoader(false);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const userReset = async () => {
    try {
      const response = await axios.delete(
        `${BaseUrl}/api/users/reset-progress`,
        {
          data: {
            email: userEmail,
          },
        }
      );
      if (!response.data) {
        toast.error("User not Reset");
      } else {
        toast.success(response.data.message);
        navigate(`/quiz/${name}`);
      }
    } catch (error) {
      console.error("Error resetting user progress:", error);
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
                      check={data?.ans === userAns[i]?.ans}
                      userAns={userAns[i]?.ans}
                    />
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
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
                        <UserSocre
                          key={user.email}
                          name={user.name}
                          rank={i + 1}
                          score={user.ansNumber}
                          email={userEmail === user.email}
                        />
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
