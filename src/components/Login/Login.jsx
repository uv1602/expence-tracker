//STYLES
import Input from "../Common/Input";
import styles from "./Login.module.scss";
import login from "../../Service/LoginService";
import * as auth from "../../Service/AuthUserDetail";
import { useState } from "react";
import People1 from "../../pics/people1.jpg";
import { useTheme } from "@mui/material";
import useStyle from "./LoginTheme";
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
} from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, handleForm] = useState({
    email: "",
    password: "",
  });
  const [error, handleError] = useState("");
  const [errors, handleErrors] = useState({});
  const [response, handleResponse] = useState({
    open: false,
  });

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

  const setError = (error) => {
    handleError(error);
    setInterval(() => handleError(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("** All fields are mandatory");
      return;
    }
    toggleBackdrop(true);
    handleResponse({ open: false });
    console.log(form);
    try {
      const result = await login(form.email, form.password);
      if (result.data["status"] === "success") {
        auth.setLogin(result.data["token"]);
      } else {
        setError(result.data["error"]);
      }
    } catch (error) {
      setError("Internal Server Error");
    }
  };
  const validateForm = () => {
    return (
      Object.keys(form).filter((field) => form[field] === "").length === 0 &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <Grid container component="main" className={styles.loginlogo}>
      <CssBaseline />

      <Snackbar
        open={response.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={response.severity}>{response.message}</Alert>
      </Snackbar>
      <Grid item xs={false} sm={4} md={7} />

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        className={styles.loginlogo}
      >
        <div>
          <Avatar
            sx={{
              margin: "2%",
              marginLeft: "35%",
              height: "70px",
              width: "70px",
            }}
          />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography
            component="p"
            variant="p"
            color={"error"}
            sx={{ textAlign: "center" }}
          >
            {error}
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email ID"
              type="email"
              id="email"
              value={form?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email !== undefined}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={form?.password}
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password !== undefined}
              helperText={errors.password}
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>

            <Typography
              component="p"
              variant="p"
              sx={{ margin: "3%", textAlign: "center" }}
            >
              New User ? <Link to={"/register"}>Create an account</Link>
            </Typography>
            <Typography
              component="p"
              variant="p"
              sx={{ margin: "3%", textAlign: "center" }}
            >
              Forgot Password ?<Link to={"/forgot"}>Click here to reset</Link>
            </Typography>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;
