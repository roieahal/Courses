const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//reset password

router.post("/", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  let newPassword = req.body.newPassword;

  try {
    //!check email
    let checkEmail = await db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);`, [email]);
    checkEmail = checkEmail.rows[0].exists;
    // console.log(checkEmail);
    if (checkEmail === false) {
      return res.send("Invalid email or password");
    }

    //!check password
    const user = await db.query(`select * from users where email = $1`, [email]);
    const userPassword = user.rows[0].password;
    const valiedPassword = await bcrypt.compare(password, userPassword);
    const userName = user.rows[0].name;
    const user_id = user.rows[0].user_id;
    console.log(valiedPassword);

    if (valiedPassword) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);
      //!update password
      const updatePassword = await db.query(`UPDATE users SET password = $1 WHERE user_id = $2`, [newPassword, user_id]);
      //!genrate token
      generateJWT = function () {
        const token = jwt.sign({ email: email, name: userName }, "thisString");
        return token;
      };
      const token = generateJWT();
      res.header("x-auth-token", generateJWT()).header("access-control-expose-headers", "x-auth-token").send({ token: token, mission: "update complited" });
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    console.log(error.message);
    res.send("Invalid email or password");
  }
});

module.exports = router;
