const db = require("./db");

const createUserTables = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS "users" (
            user_id SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            email varchar(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
        )`);
    console.log("Subjects Tables is created");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createUserTables;
