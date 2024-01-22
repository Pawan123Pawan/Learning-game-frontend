import { Link, useLocation } from "react-router-dom";
import { useOk } from "../constextapi/Private";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const [langauge, setLangaugeName] = useState("");
  useEffect(() => {
    const langauge = localStorage.getItem("langaugeName");
    setLangaugeName(langauge);
  }, []);
  const [ok, setOk] = useOk();
  return (
    <div className="border-bottom shadow">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="text-black fs-3 fw-bold">Learning Game</div>
          <div className="fs-5 ">
            {ok ? (
              <Link to={"/home"} className="me-3">
                Home
              </Link>
            ) : (
              <Link className="me-3">Home</Link>
            )}
            {ok ? (
              <Link to={`/quiz/${langauge}`} className="me-3">
                Quiz
              </Link>
            ) : (
              <Link className="me-3">Quiz</Link>
            )}
            {location.pathname == "/" ? (
              <>
                <Link to={"/"} className="me-3">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className="me-3">
                  Login
                </Link>
              </>
            )}

            {ok ? (
              <Link to={"/user/dashboard"}>Dashbord</Link>
            ) : (
              <Link>Dashbord</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
