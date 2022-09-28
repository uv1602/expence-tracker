//STYLES
import register from "../../Service/RegisterService";
import Input from "../Common/Input";
// import styles from "./Register.module.scss";
import People1 from "../../pics/people1.jpg";
import React, { useState } from "react";
import RadioMaterial from "../Common/RadioMUI";
import I from "@mui/material/Input";
// import TextField from "../Common/TextField";
import styles from "../Login/Login.module.scss";
import login from "../../Service/LoginService";
import * as auth from "../../Service/AuthUserDetail";
import Forget from "../../Service/Password";
import { useTheme } from "@mui/material";

//import LockOutlinedIcon from "@mui/icons-material";
import {
  Paper,
  Snackbar,
  Grid,
  Avatar,
  Alert,
  Typography,
  TextField,
  FormController,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Container from "@mui/material/Container";

import { Link } from "react-router-dom";
const ForgetPassword = () => {
  const [form, handleForm] = useState({
    email: "",
  });
  const [error, handleError] = useState("");
  const [errors, handleErrors] = useState({});
  const [success, handleSuccess] = useState("");

  const handleChange = (e) => {
    handleForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const [backdrop, toggleBackdrop] = useState(false);
  const handleBlur = (e) => {
    if (e.target.value === "") {
      handleErrors((errors) => ({
        ...errors,
        [e.target.name]: `${e.target.name} is required.`,
      }));
    } else {
      handleErrors((errors) => {
        let error = { ...errors };
        delete error[e.target.name];
        return error;
      });
    }
  };
  const validateForm = () => {
    return (
      Object.keys(form).filter((field) => form[field] === "").length === 0 &&
      Object.keys(errors).length === 0
    );
  };
  const setError = (error) => {
    handleError(error);
    setInterval(() => handleError(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("**All fields are mandatory");
      return;
    } else {
      toggleBackdrop(true);
      const { email } = form;

      try {
        // forget(
        //   {
        //     email,
        //   },
        //   setError,
        //   handleSuccess
        // );
        console.log(email);
        Forget({ email }, setError, handleSuccess);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid container component="main" className={styles.loginlogo}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        className={styles.loginlogo}
        sx={{
          width: "100%",
        }}
      >
        <div>
          <Avatar
            sx={{
              margin: "2%",
              marginLeft: "45%",
              height: "50px",
              width: "50px",
            }}
          />

          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <Container component="main" maxWidth="md">
              <CssBaseline />

              <Typography component="p" variant="p" color="error">
                {error}
              </Typography>
              <Typography component="p" variant="p" color="success">
                {success}
              </Typography>

              <Grid item xs={12} sm={12} md={12} square>
                <div>
                  <form noValidate onSubmit={handleSubmit} method="post">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={form?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email !== undefined}
                      helperText={errors.email}
                    />
                  </form>
                </div>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Container>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default ForgetPassword;
