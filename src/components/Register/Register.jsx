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
const Signup = () => {
  const [form, handleForm] = useState({
    email: "",
    password: "",
    cpassword: "",
    fname: "",
    lname: "",
    gender: "",
    dob: "",
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

  const validatePassword = () => {
    return form.password === form.cpassword && form.password.length > 5;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("**All fields are mandatory");

      return;
    } else {
      toggleBackdrop(true);
      const { fname, lname, email, password, cpassword, gender, dob } = form;
      const d1 = new Date(form.dob);
      const d2 = new Date();
      const diff = d2.getTime() - d1.getTime();
      const daydiff = diff / (1000 * 60 * 60 * 24 * 365);

      if (validatePassword()) {
        if (daydiff > 10) {
          try {
            register(
              {
                fname,
                lname,
                email,
                password,
                gender,
                dob,
              },
              setError,
              handleSuccess
            );
          } catch (error) {
            setError("**Age should be greater than 10 year");
          }
        } else {
        }
      } else {
        if (password.length < 5) {
          setError("**Password length should greater than 4");
        } else {
          setError("**Password and Confirm password must be same");
        }
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
            Sign Up
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
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="fname"
                          label="First Name"
                          type="text"
                          id="fname"
                          value={form?.fname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.fname !== undefined}
                          helperText={errors.fname}
                          xs={6}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="lname"
                          label="Last Name"
                          type="text"
                          id="lname"
                          value={form?.lname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.lname !== undefined}
                          helperText={errors.lname}
                        />
                      </Grid>
                    </Grid>
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
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          value={form?.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.password !== undefined}
                          helperText={errors.password}
                          xs={6}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="cpassword"
                          label="Confirm Password"
                          type="password"
                          id="cpassword"
                          value={form?.cpassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.cpassword !== undefined}
                          helperText={errors.cpassword}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="dob"
                          id="dob"
                          label="Birthday"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={form?.dob}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Grid>
                          <FormControl
                            margin="normal"
                            variant="outlined"
                            fullWidth
                          >
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                              labelId="gender"
                              id="gender-select"
                              label="Gender"
                              name="gender"
                              value={form?.gender}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors?.gender}
                            >
                              <MenuItem value="">Select Gender</MenuItem>
                              {["Male", "Female", "Other"].map((type, idx) => (
                                <MenuItem value={type} key={idx}>
                                  {type}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Typography
                component="p"
                variant="p"
                sx={{ margin: "3%", textAlign: "center" }}
              >
                Already have an account ?{" "}
                <Link to={"/login"}>Click to Login</Link>
              </Typography>
            </Container>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Signup;
