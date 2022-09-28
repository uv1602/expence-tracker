import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Modal, Snackbar, Alert, Paper } from "@mui/material";
import styles from "../Login/Login.module.scss";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  setCurrentAuthUser,
  updatePassword,
} from "../../Service/AuthUserDetail";
import { reset } from "../../Service/Password";
// import { ChangePassword } from "../../../Service/ProfileServices";

const EditForm = () => {
  const { token } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, handleForm] = useState({
    password: "",
    cpassword: "",
  });
  const [error, handleError] = useState("");
  const [errors, handleErrors] = useState({});
  const [success, handleSuccess] = useState("");
  const [user, setUser] = useState([""]);
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

  const setSuccess = (error) => {
    handleSuccess(error);
    setInterval(() => handleSuccess(""), 3000);
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
      const { password } = form;
      if (validatePassword()) {
        console.log({ updatePassword: password });
        try {
          // const user = jwtDecode.(token);
          console.log(token);

          updatePassword(password, token, setError, handleSuccess);
        } catch (ex) {
          console.log(ex);
        }
        // ChangePassword(
        //   { updatePassword: password },
        //   setError,
        //   setSuccess,
        //   setOpen
        // );
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
      >
        <Avatar
          sx={{
            margin: "2%",
            marginLeft: "35%",
            height: "70px",
            width: "70px",
          }}
        />

        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Typography component="p" variant="p" color="error">
          {error}
        </Typography>
        <Typography component="p" variant="p" color="success">
          {success}
        </Typography>

        <form noValidate onSubmit={handleSubmit} method="post">
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              value={form?.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.password !== undefined}
              helperText={errors.password}
            />
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

          <Button type="submit" fullWidth variant="contained" color="primary">
            Save Password
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditForm;

//             <Typography component="h1" variant="h5">
//               Change Password
//             </Typography>
