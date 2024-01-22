import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseUrl } from "../services/BaseUrl";
import { useOk } from "../constextapi/Private";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [ok, setOk] = useOk();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BaseUrl}/api/users/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/home");
        setOk(true);
        // navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="form-container ">
      <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>

        <div className="mb-3">
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          LOGIN
        </button>
        <div className="mt-2">
          <button
            type="button"
            className="btn forgot-btn"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
