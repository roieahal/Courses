const express = require("express");
const router = express.Router();
const db = require("../models/db");

//Get all subjects
router.get("/", async (req, res) => {
  const sqlQuery = `SELECT * FROM subjects`;
  try {
    const result = await db.query(sqlQuery);
    res.send(result.rows);
    // console.log(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// Get user by email
router.post("/getByEmail", async (req, res) => {
  const email = req.body.email;
  const sqlQuery = `SELECT name,email,user_id FROM users WHERE email=$1`;
  try {
    const result = await db.query(sqlQuery, [email]);
    res.send(result.rows[0]);
    // console.log(result.rows[0])
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// Get user by id
router.get("/getByUser/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const sqlQuery = `SELECT name,email FROM users WHERE user_id=$1`;
  try {
    const result = await db.query(sqlQuery, [user_id]);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
});

//get all user courses
router.post("/userCourses", async (req, res) => {
  const user_id = req.body.user_id;

  try {
    if (user_id) {
      let allCourses = await db.query(`SELECT name FROM courses where user_id=$1`, [user_id]);
      allCourses = allCourses.rows;
      res.send(allCourses);
    } else res.send("Log in first");
  } catch (error) {
    console.log(error.message);
    res.send("wrong");
  }
});

// Sign up for a course
router.post("/signcourse", async (req, res) => {
  const name = req.body.name;
  const user_id = req.body.user_id;

  try {
    if (user_id == null || user_id == undefined) {
      return res.send("you need to sign in first");
    }

    let subjectId_Query = `SELECT subject_id FROM subjects WHERE subject = $1;`;
    const subjectName_Values = [name];
    const subjectIdResult = await db.query(subjectId_Query, subjectName_Values);
    // console.log(subjectIdResult)
    const subject_id = subjectIdResult.rows[0].subject_id;
    let query = `SELECT user_id FROM courses WHERE subject_id=$1 and user_id=$2 `;
    let value = [subject_id, user_id];
    let user = await db.query(query, value);
    if (user.rowCount != 0) return res.send("you are already signed to this course");

    const count = `SELECT COUNT (*) FROM courses WHERE subject_id=$1`;
    let result = await db.query(count, [subject_id]);
    // console.log(result.rows[0].count);
    result = result.rows[0].count;
    let courseNum = Math.floor((result - 1) / 21) + 1;
    courseNum = courseNum === 0 ? 1 : courseNum;

    // console.log(courseNum)

    const sqlQuery = `INSERT INTO courses ( name, user_id, subject_id) VALUES ($1,$2,$3) RETURNING *`;
    const values = [name + courseNum, user_id, subject_id];
    const result1 = await db.query(sqlQuery, values);
    res.send(result1.rows[0]);
    // console.log(result1);
  } catch (error) {
    console.log(error.message);
    res.send("wrong");
  }
});

// Delete user course
router.delete("/userFromCourse", async (req, res) => {
  const user_id = req.body.user_id;
  let name = req.body.name;
  name = name.split("");
  name.splice(-1, 1);
  name = name.join("");

  // console.log(name);
  try {
    //! recive the subject id
    let subjectId_Query = `SELECT subject_id FROM subjects WHERE subject = $1;`;
    const subjectName_Values = [name];
    const subjectIdResult = await db.query(subjectId_Query, subjectName_Values);
    // console.log(subjectIdResult)
    const subject_id = subjectIdResult.rows[0].subject_id;

    //! check if user signed up alredy to the course
    let query = `SELECT user_id FROM courses WHERE subject_id=$1 and user_id=$2 `;
    let value = [subject_id, user_id];
    let user = await db.query(query, value);
    console.log(user.rowCount);
    if (user.rowCount == 0) return res.send("you cant delete course that you didnt sign up to");

    //!getting the last user in a course name
    let lastUser = await db.query(`SELECT user_id FROM courses where subject_id = $1 order by course_id desc limit 1`, [subject_id]);
    lastUser = lastUser.rows[0].user_id;
    // console.log(lastUser)

    //!delete user
    const deleteLast = `DELETE FROM courses WHERE user_id = $1 AND subject_id = $2;`;
    const result = await db.query(deleteLast, [lastUser, subject_id]);
    // res.send("you have been deleted from this course");

    //!update the last one
    const updateLast = await db.query(`UPDATE courses SET user_id = $1 WHERE user_id = $2`, [lastUser, user_id]);

    res.send("you have been deleted");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;

// // Delete user course
// router.delete("/:user_id", async (req, res) => {
//   const user_id = req.body.user_id;
//   const name = req.body.name;

//   try {
//     let subjectId_Query = `SELECT subject_id FROM subjects WHERE subject = $1;`;
//     const subjectName_Values = [name];
//     const subjectIdResult = await db.query(subjectId_Query, subjectName_Values);
//     // console.log(subjectIdResult)
//     const subject_id = subjectIdResult.rows[0].subject_id;

//     let query = `SELECT user_id FROM courses WHERE subject_id=$1 and user_id=$2 `;
//     let value = [subject_id, user_id];
//     let user = await db.query(query, value);
//     console.log(user.rowCount);
//     if (user.rowCount == 0) return res.status(400).send("you cant delete course that you didnt sign up to");

//     const sqlQuery = `DELETE FROM courses WHERE user_id = $1 AND subject_id = $2;`;
//     const result = await db.query(sqlQuery, [user_id, subject_id]);
//     res.send("you have been deleted from this course");
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// });
