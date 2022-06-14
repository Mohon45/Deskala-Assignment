import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import "../Assets/Css/Style.css";
import SignUp from "../components/TaskOne/SignUp/SignUp";
import Login from "../components/TaskOne/Login/Login";
import Candidates from "../components/TaskTwo/Candidates/Candidates";
import Create from "../components/TaskTwo/Candidates/Create";
import Edit from "../components/TaskTwo/Candidates/Edit";
import Notify from "../Shared/Notify/Notify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/create" element={<Create />} />
        <Route path="/candidates/edit/:id" element={<Edit />} />
      </Routes>
      <Notify />
    </div>
  );
}

export default App;
