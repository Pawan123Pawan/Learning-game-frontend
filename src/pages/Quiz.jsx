import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../services/BaseUrl";
import { useParams } from "react-router";
import EachQuestion from "../component/EachQuestion";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../component/LoaderSpinner";
import { toast } from "react-toastify";

function Quiz() {
  const { name } = useParams();
  const navagate = useNavigate();
  const [question, setQuestionData] = useState([]);
  const [ans, setAns] = useState(0);
  const [eachQuestionAns, setEachQuestionAns] = useState([]);
  const [loader, setLoader] = useState(true);

  // feching question data
  useEffect(() => {
    fetchQuestionData();
    setNameLanguage();
  }, [name]);

  function setNameLanguage() {
    // Setting data in local storage
    localStorage.setItem("langaugeName", `${name}`);
  }

  const fetchQuestionData = async () => {
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
  //managing the each question
  async function manageAns(ans, id) {
    try {
      const data = await axios.get(
        `${BaseUrl}/api/questions/check-question/${id}`
      );

      setEachQuestionAns((preData) => [...preData, { ans: ans, id: id }]);
      if (data.data.ans.toLowerCase() === ans.toLowerCase()) {
        setAns((prevAns) => prevAns + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // submiting the all answers
  async function submitAllAnwer() {
    if (eachQuestionAns) {
      localStorage.setItem("userAns", JSON.stringify(eachQuestionAns));
      navagate("/user/dashboard");
    } else {
      console.log("did't sumit all answers");
    }
    try {
      const data = JSON.parse(localStorage.getItem("userData"));

      if (data) {
        const user = await axios.post(
          `${BaseUrl}/api/users/userset-performance`,
          { name: data.user.name, email: data.user.email, ansNumber: ans }
        );
        toast.success("User performance saved successfully");
      } else {
        toast.error("Somthing error userobj");
      }
    } catch (error) {
      console.error(error);
      toast.error("User performance did't save");
    }
  }
  return (
    <>
      {loader ? (
        <LoaderSpinner />
      ) : (
        <div className="container border mt-3 p-3 rounded">
          <h1 className="text-uppercase text-center fs-bold">{name} Quiz</h1>
          {question?.map((data, i) => (
            <EachQuestion
              key={i}
              data={data}
              number={i + 1}
              manageAns={manageAns}
            />
          ))}
          <div className="text-center">
            <button className="btn btn-primary" onClick={submitAllAnwer}>
              Submit Ans
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Quiz;
