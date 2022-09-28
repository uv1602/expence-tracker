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
import { deactivateUser } from "../../../Service/ProfileServices";

const EditForm = ({ email }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, handleForm] = useState({
    current: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("**Please enter your valid password");
      return;
    } else {
      toggleBackdrop(true);
      const { current } = form;

      console.log({ password: current, email: email });
      deactivateUser(
        { password: current, email: email },
        setError,
        handleSuccess,
        setOpen
      );
    }
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Deactivate Account
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
              Deactivate Your Account
            </Typography>

            <Grid container component="main">
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
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                square
                sx={{
                  margin: "5%",
                }}
              >
                <div>
                  <form noValidate onSubmit={handleSubmit} method="post">
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="current"
                        label="Enter Your Password"
                        type="password"
                        id="current"
                        value={form?.current}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.current !== undefined}
                        helperText={errors.current}
                        xs={6}
                      />
                    </Grid>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="error"
                      margin="normal"
                    >
                      Deactivate
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
