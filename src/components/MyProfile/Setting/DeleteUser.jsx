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
import { deleteUser } from "../../../Service/ProfileServices";

const EditForm = ({ uid }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async () => {
    await deleteUser(uid, setSuccess);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Delete Account
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
              Delete Your Account
            </Typography>

            <Grid container component="main">
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
                      <Typography
                        component="p"
                        variant="p"
                        color="success"
                        sx={{ textAlign: "center" }}
                      >
                        Are you Sure want to delete your account?
                      </Typography>
                    </Grid>

                    <Button
                      type="submit"
                      fullWidth
                      margin="normal"
                      variant="contained"
                      color="error"
                      sx={{ margin: "2%" }}
                    >
                      Delete Your Account
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      margin="normal"
                      color="info"
                      sx={{ margin: "2%" }}
                      onClick={handleClose}
                    >
                      Back
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
