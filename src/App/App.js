import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import "../Assets/Css/Style.css";
import SignUp from "../components/TaskOne/SignUp/SignUp";
import Login from "../components/TaskOne/Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
