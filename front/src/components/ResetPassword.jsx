import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/data";

const theme = createTheme();

export default function SignUp() {
  //! states
  const { userData, setUserData, counter, setCounter,reset, setReset } = useContext(DataContext);
  const navigator = useNavigate();

  //!submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const formSignInData = new FormData(event.currentTarget);
    setReset({ ...reset, email: formSignInData.get("email"), password: formSignInData.get("password"), newPassword: formSignInData.get("newPassword") });
    setCounter(counter + 1);
  };

  //! turn the check func on
  const mafil = () => {
    handleHttp();
    return;
  };

  //!check and and log in and update password
  const handleHttp = async () => {
    const result = await axios.post("http://localhost:3003/api/reset", reset);
    console.log(result);
    if (result.data === "Invalid email or password") {
      alert("Invalid email or password");
    }else if (result.data==="something went worng"){
      alert('something went worng')
    }else {
      // const getAllUserData = await axios.post("http://localhost:3003/api/courses/getByEmail", userData);
      // console.log(getAllUserData.data);
      // setUserData(getAllUserData.data);
      setCounter("finito");
      localStorage.setItem("token", result.headers["x-auth-token"]);
      alert('your password has been updated')
      navigator("/");
    }
  };

  useEffect(() => {
    if (counter === 0) {
      return;
    } else if (typeof counter === "number") mafil();
    else {
      return;
    }
  }, [counter]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="given-name" name="password" type="password" required fullWidth id="password" label="Current Password" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="newPassword" label="New Password" type="password" id="NewPanewPasswordssword" autoComplete="newPassword" />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Reset
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    setCounter(0);
                    navigator("/SignIn");
                  }}
                  variant="body2"
                >
                  back to Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
