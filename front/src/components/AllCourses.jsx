import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/data";
import "../Css/AllCoursesCSS.css";

const AllCourses = () => {
  const { userData, setUserData, counter, setCounter, subjects, setsubjects, getAllSubjects, userCourses } = useContext(DataContext);

  useEffect(() => {
    getAllSubjects();
  }, []);

  const signUpToCourse = async (subject) => {
    const dataNeeded = { user_id: userData.user_id, name: subject };
    // console.log(dataNeeded)
    const result = await axios.post("http://localhost:3003/api/courses/signcourse", dataNeeded);
    // console.log(result.data);
    if (result.data === "you are already signed to this course") {
      alert(`${userData.name + ", "}you are already signed to this course`);
    } else if (result.data === "you need to sign in first") {
      alert(`${userData.name + " "}you need to sign in first`);
    } else alert(`congratulation ${userData.name + " "} you signed to ${subject} course`);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Of Our Courses</h1>
      <div className="containerCourses">
        {subjects.map((subject) => (
          <div className="card" key={subject.subject}>
            <div className="card-img">
              <img className="imgg" src={`/img/${subject.subject}.png`} alt="" />
            </div>
            <div className="card-info">
              <p className="text-title">{subject.subject}</p>
              <p className="text-body">Product description and details</p>
            </div>
            <div className="card-footer">
              <span className="text-title1">rating: {" " + subject.rating}</span>
              <button className="box1" onClick={() => signUpToCourse(subject.subject)}>
                <span className="box">Sign Up</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
