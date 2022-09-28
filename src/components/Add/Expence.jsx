import Input from "../Common/Input";
import { WiStars } from "react-icons/wi";
import { useState } from "react";
import Header from "../Common/Header";
import Message from "../Common/Message";
import styles from "../Common/Dashboard.module.scss";
import { Icon } from "@iconify/react";
// import Button from "../Common/Button";
import { expense } from "../../Service/ExpenseService";

import { margin } from "@mui/system";
import { Grid } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
const Add = () => {
  const [msg, setMsg] = useState(0);
  const [error, handleError] = useState("");
  const [errors, handleErrors] = useState({});
  const [success, handleSuccess] = useState("");
  const [form, handleForm] = useState({
    price: "",
    category: "",
    dob: "",
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
  const validateForm = () => {
    return (
      Object.keys(form).filter((field) => form[field] === "").length === 0 &&
      Object.keys(errors).length === 0
    );
  };
  const setError = (error) => {
    handleError(error);
    setInterval(() => handleError(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("**All fields are mandatory");

      return;
    } else {
      toggleBackdrop(true);

      expense({
        date: form.dob,
        cat_name: form.category,
        amount: form.price,
      });
      setMsg(1);
    }
  };

  return (
    <main>
      <Header message="Add Expenses" ficon={<WiStars />} />
      <Grid
        container
        spacing={3}
        sx={{
          margin: "2%",
        }}
      >
        <Grid xs={6} md={4} sm={6}>
          <Button
            colour={"success"}
            url={"/dashBoard"}
            body="Back to Dashboard"
            ficon={
              <Icon icon="emojione-monotone:backhand-index-pointing-left" />
            }
          />
        </Grid>
        <Grid xs={2} md={6} sm={2}></Grid>
        <Grid xs={4} md={2} sm={4}>
          <Button colour={"info"} url={"/show"} body="Show Record" />
        </Grid>
      </Grid>

      <div className={styles.box}>
        {msg !== 0 && <Message />}
        <Typography component="p" variant="p" color="error">
          {error}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="category"
            label="Enter Category"
            type="text"
            id="category"
            value={form?.category}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.category !== undefined}
            helperText={errors.category}
            xs={6}
            InputLabelProps={{
              color: "error",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="dob"
            id="dob"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={form?.dob}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="price"
            label="Amount"
            type="number"
            id="price"
            value={form?.price}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.price !== undefined}
            helperText={errors.price}
            xs={6}
            InputLabelProps={{
              color: "error",
            }}
          />
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <button className="btn btn-primary"> Submit </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Add;
