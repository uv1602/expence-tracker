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
import { Modal, Snackbar, Alert } from "@mui/material";
import { ChangePassword } from "../../../Service/ProfileServices";

const EditForm = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, handleForm] = useState({
    current: "",
    password: "",
    cpassword: "",
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
      const { password, cpassword, current } = form;
      if (validatePassword()) {
        console.log({ password: current, updatePassword: password });
        ChangePassword(
          { password: current, updatePassword: password },
          setError,
          setSuccess,
          setOpen
        );
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
    <>
      <Button variant="contained" color="info" onClick={handleOpen}>
        Change Password
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            noValidate
            onSubmit={handleSubmit}
            sx={{
              margin: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#001E3C",
              padding: "8%",
              borderRadius: "10px",
              width: "100%",
              marginTop: "30%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Change Password
            </Typography>

            <Grid container component="main">
              <CssBaseline />
              {/* <Snackbar
                open={response.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert severity={response.severity}>{response.message}</Alert>
              </Snackbar> */}
              <Typography component="p" variant="p" color="error">
                {error}
              </Typography>
              <Typography component="p" variant="p" color="success">
                {success}
              </Typography>
              <Grid item xs={12} sm={12} md={12} square>
                <div>
                  <form noValidate onSubmit={handleSubmit} method="post">
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="current"
                        label="Current Password"
                        type="password"
                        id="current"
                        value={form?.current}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.current !== undefined}
                        helperText={errors.current}
                        xs={6}
                      />
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

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Save Password
                    </Button>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default EditForm;
