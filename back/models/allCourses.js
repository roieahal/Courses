const db = require("./db");

const createCoursesTables = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS "courses" (
        course_id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        user_id int,
        subject_id int,
		FOREIGN KEY (user_id) REFERENCES users(user_id),
		FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
)`);
    console.log("Courses Tables is created");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createCoursesTables;
