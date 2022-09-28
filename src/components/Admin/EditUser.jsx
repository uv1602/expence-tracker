import React, { useState } from "react";
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
import { profileServices } from "../../Service/AdminService";

const EditForm = ({ user, setDetail, reload }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState("");

  const [form, handleForm] = useState({
    lname: "",
    fname: "",
    email: "",
    dob: "",
    role: "",
    gender: "",
    status: "",
  });

  const [errors, handleErrors] = useState({});
  const [response, handleResponse] = useState({
    open: false,
  });

  const handleChange = (e) => {
    handleForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResponse({ open: false });
    const { fname, lname, gender, dob, email, status, role } = form;
    const validDate = dob ? dob : user.dob;
    const d1 = new Date(validDate);
    const d2 = new Date();
    const diff = d2.getTime() - d1.getTime();
    const daydiff = diff / (1000 * 60 * 60 * 24 * 365);
    if (daydiff > 10) {
      profileServices(
        {
          fname: fname ? fname : user.fname,
          lname: lname ? lname : user.lname,
          gender: gender ? gender : user.gender,
          dob: validDate,
          email: email ? email : user.email,
          role: role ? role : user.role,
          status: status ? status : user.status,
        },
        handleClose,
        reload
      );
    } else {
      setError("*****Date should be greatere than 10 Year");
    }
  };

  return (
    <>
      <Button variant="contained" color="info" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="md">
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
              marginTop: "10%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Edit User
            </Typography>

            <Typography component="p" variant="p" color="error">
              {error}
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
                  <form noValidate onSubmit={handleSubmit} method="post">
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="fname"
                          placeholder={user.fname}
                          label="First Name"
                          type="text"
                          id="fname"
                          value={form?.fname}
                          onChange={handleChange}
                          error={errors.Name !== undefined}
                          helperText={errors.Name}
                          xs={6}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          placeholder={user.lname}
                          name="lname"
                          label="Last Name"
                          type="text"
                          id="lname"
                          value={form?.lname}
                          onChange={handleChange}
                          error={errors.Name !== undefined}
                          helperText={errors.Name}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      placeholder={user.email}
                      id="email"
                      label="Email Address"
                      name="email"
                      placeholder={user.email}
                      value={form?.email}
                      onChange={handleChange}
                      error={errors.email !== undefined}
                      helperText={errors.email}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          placeholder={user.dob}
                          name="dob"
                          id="dob"
                          label="Birthday"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={form?.dob}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid>
                          <FormControl
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            placeholder={user.gender}
                          >
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                              labelId="gender"
                              id="gender-select"
                              label="Gender"
                              name="gender"
                              value={form?.gender}
                              onChange={handleChange}
                              error={errors?.gender}
                            >
                              <MenuItem value=" ">Select Gender</MenuItem>
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
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          placeholder={user.status}
                        >
                          <InputLabel id="status">Status</InputLabel>
                          <Select
                            labelId="status"
                            id="status-select"
                            label="Status"
                            name="status"
                            value={form?.type}
                            onChange={handleChange}
                            error={errors?.type}
                          >
                            <MenuItem value="">Select Role</MenuItem>

                            <MenuItem value="1">Verifed</MenuItem>
                            <MenuItem value="0">Not Verifed</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          placeholder={user.role}
                        >
                          <InputLabel id="role-type">Role</InputLabel>
                          <Select
                            labelId="role-type"
                            id="role-type-select"
                            label="Role Type"
                            name="role"
                            value={form?.type}
                            onChange={handleChange}
                            error={errors?.type}
                          >
                            <MenuItem value="">Select Role</MenuItem>
                            <MenuItem value="0">User</MenuItem>
                            <MenuItem value="1">Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      sx={{
                        margin: "3%",
                        marginLeft: "40%",
                      }}
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
