const { response } = require("express");
const express = require("express");
const db = require("./db/db");
const app = express.Router();

require("dotenv").config();

app.get("/api/admin/show/all", (req, res) => {
  try {
    db.execute(
      `select uid,fname,lname,email,dob,gender,status,role from user  ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "No users found";
          } else {
            result["status"] = "success";
            result["result"] = data;
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/admin/show/verified", (req, res) => {
  try {
    db.execute(
      `select uid,fname,lname,email,dob,gender,status,role from user where status =1 ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "No verfied user found";
          } else {
            result["status"] = "success";
            result["result"] = data;
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/admin/show/notverified", (req, res) => {
  try {
    db.execute(
      `select uid,fname,lname,email,dob,gender,status,role from user where status =0 ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "No non-verfied user found";
          } else {
            result["status"] = "success";
            result["result"] = data;
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/admin/show/admin", (req, res) => {
  try {
    db.execute(
      `select uid,fname,lname,email,dob,gender,status,role from user where role =1 ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "No admin found";
          } else {
            result["status"] = "success";
            result["result"] = data;
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/admin/show/user", (req, res) => {
  try {
    db.execute(
      `select uid,fname,lname,email,dob,gender,status,role from user where role =0 ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "No  user found";
          } else {
            result["status"] = "success";
            result["result"] = data;
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/admin/show/suspend", (req, res) => {
  try {
    db.execute(
      `select uid,fname,lname,email,dob,gender,status,role from user where status=2 ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "No suspended user found";
          } else {
            result["status"] = "success";
            result["result"] = data;
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.delete("/api/admin/delete/:uid", (req, res) => {
  const { uid } = req.params;
  const id = req.body;
  console.log(uid);
  try {
    db.execute(`delete from user where uid=${uid};`, (err, data) => {
      const result = { status: "" };
      if (err != null) {
        result["status"] = "error";
        result["error"] = err;
      } else {
        if (data.length == 0) {
          result["status"] = "error";
          result["error"] = "User not found";
        } else {
          result["status"] = "success";
          result["result"] = "User is deleted successfully";
        }
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/admin/edit/user", (req, res) => {
  const id = req.userID;
  const { fname, lname, email, dob, gender, role, status, uid } = req.body;
  const statement = `update user set fname="${fname}", lname="${lname}",  dob="${dob}", gender="${gender}", role="${role}", status="${status}" where email="${email}";`;
  console.log(fname, lname, email, dob, gender, role, status, uid, statement);

  try {
    db.execute(statement, (error, data) => {
      const result = {
        status: "",
      };

      if (error != null) {
        result["status"] = "error";
        result["error"] = "Invalid credentials!!";
        res.status(400);
      } else {
        result["status"] = "success";
        result["result"] = "User updated";
        console.log("User updated");
      }
      res.send(result);
    });
  } catch (ex) {
    console.log(ex);
  }
});

app.patch("/api/admin/activate", async (req, res) => {
  const { uid } = req.body;
  const statement = `update user set status=1 where uid=${uid};`;
  console.log(statement);
  try {
    db.execute(statement, (error, data) => {
      const result = {
        status: "",
      };
      if (error != null) {
        result["status"] = "error";
        result["error"] = "Invalid credentials!!";
        res.status(400);
      } else {
        result["status"] = "success";
        result["result"] = "User updated";
        console.log("User updated");
      }
      res.send(result);
    });
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = app;
