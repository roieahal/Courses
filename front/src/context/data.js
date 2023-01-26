import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./../components/SignIn";
import jwt_decode from "jwt-decode";

export const DataContext = createContext();

function DataProvider(props) {
  const { children } = props;

  const [userData, setUserData] = useState({});

  const [counter, setCounter] = useState(0);

  const [subjects, setsubjects] = useState([]);

  const [userCourses, setUserCourses] = useState([]);

  const [reset, setReset] = useState({});

  const getAllSubjects = async () => {
    const allSubjects = await axios.get("http://localhost:3003/api/courses");
    setsubjects(allSubjects.data);
  };

  const getAllCoursesUser = async () => {
    let allToken = await jwt_decode(localStorage.getItem("token"));
    // const { name, user_id, email } = allToken;
    // setUserData({ name, user_id, email });
    // console.log(allToken);

    const result = await axios.post("http://localhost:3003/api/courses/userCourses", allToken);
    console.log(result.data);
    setUserCourses(result.data);
  };

  const getUserData = async () => {
    if (localStorage.getItem("token")) {
      let allToken = await jwt_decode(localStorage.getItem("token"));
      const { name, user_id, email } = allToken;
      setUserData({ name, user_id, email });
    }
  };

  return <DataContext.Provider value={{ reset, setReset, userData, setUserData, counter, setCounter, subjects, setsubjects, getAllSubjects, getUserData, userCourses, setUserCourses, getAllCoursesUser }}>{children}</DataContext.Provider>;
}

export default DataProvider;
