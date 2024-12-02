import { useEffect, useState } from "react";
import classes from "./App.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import RandomRoom from "./pages/randomRoom/RandomRoom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import You from "./pages/you/You";
import { useDispatch, useSelector } from "react-redux";
import api from "./services/api/Auth.api";
import { loginFail, loginSuccess } from "./store/userSlice";
import Blank from "./pages/Blank";
import { ProtectedRoute } from "protected-route-react";
import Verify from "./pages/Verify";
import socket from "./socket";

function App() {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const resp = await api.loadUser();
        console.log("=====>", resp);
        dispatch(loginSuccess(resp.user));
        socket.emit("user-joined", resp.user);
        navigate("/you");
        setLoading(false);
      } catch (error) {
        dispatch(loginFail());
        setLoading(false);
        console.log(error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (userInfo) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [userInfo]);
  return (
    <div className={classes.container}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route exact path="/" element={loading ? <Blank /> : <HomePage />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route exact path="/random-room/:id" element={<RandomRoom />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/you"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
              <You />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
