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
import {
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import ProfileServices from "../../../Service/ProfileServices";
import { setCurrentAuthUser } from "../../../Service/AuthUserDetail";

const EditForm = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { fname, lname, gender, dob, email } = user;
  const [form, handleForm] = useState({
    lname: "",
    fname: "",
    email: "",
    dob: "",
    gender: "",
  });
  const [errors, handleErrors] = useState({});
  const [response, handleResponse] = useState({
    open: false,
  });
  const [token, setToken] = useState("");
  const handleChange = (e) => {
    handleForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    handleErrors((errors) => {
      let error = { ...errors };
      delete error[e.target.name];
      return error;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResponse({ open: false });

    const { fname, lname, email, dob, gender } = form;
    ProfileServices(
      {
        fname: fname ? fname : user.fname,
        lname: lname ? lname : user.lname,
        gender: gender ? gender : user.gender,
        dob: dob ? dob : user.dob,
        email: email ? email : user.email,
      },
      setToken
    );
    setCurrentAuthUser(setUser, token);
    console.log(token);
  };

  return (
    <>
      <Button variant="contained" color="info" onClick={handleOpen}>
        Edit Profile
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
              background: "whitesmoke",
              padding: "8%",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Edit User
            </Typography>

            <Grid container component="main">
              <CssBaseline />
              <Snackbar
                open={response.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert severity={response.severity}>{response.message}</Alert>
              </Snackbar>

              <Grid item xs={12} sm={12} md={12} square>
                <div>
                  {console.log(user)}
                  <form noValidate onSubmit={handleSubmit} method="post">
                    <Grid item xs={12}>
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
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      placeholder={user.email}
                      autoFocus
                      value={form?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email !== undefined}
                      helperText={errors.email}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
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
                    <Grid>
                      <FormControl variant="outlined" fullWidth>
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
                          <MenuItem value=" ">Select Gender</MenuItem>
                          {["Male", "Female"].map((type, idx) => (
                            <MenuItem value={type} key={idx}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Save Details
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
