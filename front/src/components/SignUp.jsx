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
  const { userData, setUserData, counter, setCounter } = useContext(DataContext);
  const navigator = useNavigate();

  //!submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const formSignInData = new FormData(event.currentTarget);
    setUserData({ ...userData, email: formSignInData.get("email"), password: formSignInData.get("password"), name: formSignInData.get("firstName") });
    setCounter(counter + 1);
    // console.log(userData)
    // console.log(counter)
  };

  //! turn the check func on
  const mafil = () => {
    handleHttp();
    return;
  };

  //!check and and log in and get all info about the user
  const handleHttp = async () => {
    const result = await axios.post("http://localhost:3003/api/signUp", userData);
    // console.log(result);
    if (result.data === "Invalid email or password") {
      alert("Invalid email or password");
    } else {
      // const getAllUserData = await axios.post("http://localhost:3003/api/courses/getByEmail", userData);
      // // console.log(getAllUserData.data);
      // setUserData(getAllUserData.data);
      setCounter("finito");
      localStorage.setItem("token", result.headers["x-auth-token"]);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="Full Name" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required type="email" fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
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
                  Already have an account? Sign in
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
