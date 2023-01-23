import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/data";
import "../Css/MyCoursesCSS.css";

const AllCourses = () => {
  const { userData, setUserData, counter, setCounter, subjects, setsubjects, getAllSubjects, userCourses, setUserCourses, getAllCoursesUser, getUserData } = useContext(DataContext);

  useEffect(() => {
    getUserData();
    getAllCoursesUser();
  }, []);

  const deletUserFromCourse = async (course) => {
    const dataNeeded = { user_id: userData.user_id, name: course };
    // console.log(dataNeeded)
    const result = await axios.delete("http://localhost:3003/api/courses/userFromCourse", { data: dataNeeded });
    // console.log(result.data);
    if (result.data === "you cant delete course that you didnt sign up to") {
      alert(`${userData.name + ", "}you cant delete course that you didnt sign up to`);
    } else if (result.data === "you have been deleted") {
      alert(`${userData.name + " "}you have been remove from ${course + " "} course `);
      getAllCoursesUser();
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Courses</h1>
      <div className="containerCourses">
        {userCourses.map((course) => (
          <div className="card" key={course.name}>
            <div className="card-img"></div>
            <div className="card-info">
              <p className="text-title">{course.name.slice(0, -1)}</p>
              <p className="text-body">Product description and details</p>
            </div>
            <div className="card-footer1">
              <button className="box1" onClick={() => deletUserFromCourse(course.name)}>
                <span className="box">Decline</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
