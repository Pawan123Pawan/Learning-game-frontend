import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/Header";
import Quiz from "./pages/Quiz";
import UserDashboard from "./pages/user/UserDashbord";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import ForgotPasssword from "./pages/ForgaotPassword";
import AuthProvider from "./constextapi/auth";
import { RouteProvider } from "./constextapi/Private";

const App = () => {
  return (
    <RouteProvider>
      <BrowserRouter>
        <AuthProvider />
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasssword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz/:name" element={<Quiz />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </RouteProvider>
  );
};

export default App;
