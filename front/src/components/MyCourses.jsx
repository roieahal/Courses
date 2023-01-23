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
            <div className="card-img">
              {" "}
              <img className="imgg" src={`/img/${course.name.slice(0, -1)}.png`} alt="" />
            </div>
            <div className="card-info">
              <p className="text-title">{course.name.slice(0, -1)}</p>
              <p className="text-body">you can sign out courses any time by clicking Decline</p>
            </div>
            <div className="card-footer1">
              <button className="button" onClick={() => deletUserFromCourse(course.name)}>
                <span className="text">Decline</span>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
