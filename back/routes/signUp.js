const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// Add new user :
router.post("/", async (req, res) => {
  const name = req.body.name;
  let password = req.body.password;
  const email = req.body.email;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  try {
    //!check double email
    let checkEmail = await db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);`, [email]);
    checkEmail = checkEmail.rows[0].exists;
    // console.log(checkEmail)
    if (checkEmail === true) {
      return res.send("Invalid email or password");
    }

    //!insert new user
    const sqlQuery = `INSERT INTO users ( name, password, email) VALUES ($1,$2,$3) RETURNING *`;
    const values = [name, password, email];
    const result = await db.query(sqlQuery, values);

    //!get the user_id
    const user = await db.query(`select * from users where email = $1`, [email]);
    const user_id = user.rows[0].user_id;

    //   //!genrate token
    generateJWT = function () {
      const token = jwt.sign({ name: name, email: email, user_id: user_id }, "thisString");
      return token;
    };

    const token = generateJWT();

    res.header("x-auth-token", generateJWT()).header("access-control-expose-headers", "x-auth-token").send({ token: token });
  } catch (error) {
    console.log(error.message);
    res.send("Invalid email or password");
  }
});

module.exports = router;
