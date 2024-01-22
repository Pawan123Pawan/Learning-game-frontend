import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [buttonName, setButtonName] = useState("Select Language");
  return (
    <div className="w-100  myBackground">
      <div className="d-flex justify-content-center align-items-center flex-column pt-5">
        <h1 className="m-5 text-center">
          Welcome to the Language Learning Game!
        </h1>
        <div className="dropdown d-grid gap-2 col-3 mx-auto">
          <button
            className="btn btn-secondary p-2 mt-5 mb-2 fs-4"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            {buttonName.toUpperCase()}
          </button>
          <ul className="dropdown-menu  dropdown-menu-lg-end ">
            <li>
              <Link
                className="dropdown-item"
                onClick={() => setButtonName("english")}
              >
                English
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                onClick={() => setButtonName("hindi")}
              >
                Hindi
              </Link>
            </li>
            <li>
              <Link className="dropdown-item">Other</Link>
            </li>
          </ul>
        </div>

        <div className="d-grid gap-2 col-3 mx-auto">
          <button
            className="btn btn-primary fs-4"
            onClick={() => navigate(`/quiz/${buttonName}`)}
          >
            Quiz Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
