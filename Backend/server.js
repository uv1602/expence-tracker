// importing
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const createTable = require("./db/table_create");
require("dotenv").config();
const userRouter = require("./users");
const expenseRouter = require("./Expense");
const adminRouter = require("./admin");

// create instance
const app = express();

app.options("*", cors());
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

createTable(
  "create table if not exists `user` (uid int primary key auto_increment, fname varchar(50), lname varchar(50), email varchar(50) unique, `password` varchar(255), dob varchar(255), gender varchar(10), status int default 0,role int default 0);"
);

createTable(
  "create table if not exists `expense` (eid int primary key auto_increment, cat_name varchar(50), uid int, amount int, `date` date);"
);

app.use((request, response, next) => {
  console.log(request.url);
  if (
    request.url == "/" ||
    request.url == "/api/login" ||
    request.url == "/api/register" ||
    request.url == "/api/profile/forgot" ||
    request.url == "/api/profile/change/reset" ||
    request.url == "/api/profile/change/verify"
  ) {
    next();
  } else {
    // get the toekn from header
    const token = request.headers["x-token"];
    try {
      // verify if then token is original or intact
      const payload = jwt.verify(token, process.env.SECRET);
      request.userID = payload.uid;
      next();
    } catch (ex) {
      console.log(ex);
      response.send({
        status: "error",
        error: "unauthorized access",
      });
    }
  }
});

app.use(userRouter);
app.use(expenseRouter);
app.use(adminRouter);

app.get("/", (req, res) => {
  console.log("get method");
  res.send("get");
});

app.post("/", (req, res) => {
  console.log("post method");
  res.send("post");
});

// listening port
app.listen(process.env.PORT, () => {
  console.log(`Backend is started at Port no ${process.env.PORT}`);
});
