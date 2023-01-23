import "./App.css";
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import AllCourses from "./components/AllCourses";
import MyCourses from "./components/MyCourses";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllCourses />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/MyCourses" element={<MyCourses />} />
      </Routes>
    </div>
  );
}

export default App;
