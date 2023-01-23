const express = require("express");
const app = express();
const createUserTables = require("./models/users");
const createSubjectsTables = require("./models/subjects");
const createCoursesTables = require("./models/allCourses");
const courses = require("./routes/coursesR");
const signUp = require("./routes/signUp");
const logIn = require("./routes/logIn");
const reset = require("./routes/resetPassword");

const cors = require("cors");


app.use(cors());
app.use(express.json());

createUserTables();
createSubjectsTables();
createCoursesTables();

app.use("/api/logIn", logIn);
app.use("/api/courses", courses);
app.use("/api/signUp", signUp);
app.use("/api/reset", reset);

// PORT
const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`active on ${port}`));
