import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const RouteProvider = ({ children }) => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("userData");

    if (data) {
      setOk(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={[ok, setOk]}>{children}</AuthContext.Provider>
  );
};

const useOk = () => useContext(AuthContext);

export { useOk, RouteProvider };
