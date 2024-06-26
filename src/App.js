import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/screens/home";
import { SignUp } from "./components/screens/SignUp";
import { Signin } from "./components/screens/Signin";
import { Profile } from "./components/screens/profile";
import { Createpost } from "./components/screens/Createpost";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducers/userReducer";
import { UserProfile } from "./components/screens/userprofile";
import { SubscribedPost } from "./components/screens/Subscribed_User_post";

export const UserContext = createContext();

const Routing = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exaxt path="/profile" element={<Profile />} />
      <Route exaxt path="/create" element={<Createpost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowerspost" element={<SubscribedPost />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
