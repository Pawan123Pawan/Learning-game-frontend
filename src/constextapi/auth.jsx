import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      navigate("/home");
    }
  }, []);
  return <div></div>;
};
export default AuthProvider;
