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
  verify,
} from "../../Service/AuthUserDetail";
import { reset } from "../../Service/Password";
// import { ChangePassword } from "../../../Service/ProfileServices";

const EditForm = () => {
  const { token } = useParams();

  const [error, handleError] = useState("");
  const [errors, handleErrors] = useState({});
  const [success, handleSuccess] = useState("");
  const [user, setUser] = useState([""]);

  const setError = (error) => {
    handleError(error);
    setInterval(() => handleError(""), 3000);
  };

  const setSuccess = (error) => {
    handleSuccess(error);
    setInterval(() => handleSuccess(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      verify(token, setError, handleSuccess);
    } catch (ex) {
      console.log(ex);
      setError("Some thing wrong !!! Please try again ");
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
          Verification
        </Typography>
        <Typography component="p" variant="p">
          {success}
        </Typography>
        <Typography component="p" variant="p" color={"error"}>
          {error}
        </Typography>
        <Typography
          component="h1"
          variant="p"
          color="success"
          sx={{ margin: "5%" }}
        >
          Click to verify button to verify your account
        </Typography>
        <form noValidate onSubmit={handleSubmit} method="post">
          <Button type="submit" fullWidth variant="contained" color="primary">
            Verify
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditForm;
