const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//log in

router.post("/", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  try {
    //!check email
    let checkEmail = await db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);`, [email]);
    checkEmail = checkEmail.rows[0].exists;
    console.log(checkEmail);
    if (checkEmail === false) {
      return res.send("Invalid email or password");
    }

    //!check password
    const user = await db.query(`select * from users where email = $1`, [email]);
    const userPassword = user.rows[0].password;
    const valiedPassword = await bcrypt.compare(password, userPassword);
    const userName = user.rows[0].name;
    const user_id = user.rows[0].user_id;
    if (valiedPassword) {
      //!genrate token
      generateJWT = function () {
        const token = jwt.sign({ email: email, name: userName, user_id: user_id }, "thisString");
        return token;
      };
      const token = generateJWT();
      res.header("x-auth-token", generateJWT()).header("access-control-expose-headers", "x-auth-token").send({ token: token });
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    console.log(error.message);
    res.send("Invalid email or password");
  }
});

module.exports = router;
