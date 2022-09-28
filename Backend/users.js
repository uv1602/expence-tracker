const express = require("express");
const db = require("./db/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const sendEmail = require("./mailer");
const app = express.Router();

require("dotenv").config();

app.post("/api/login", (request, response) => {
  const { email, password } = request.body;
  const encryptedPassword = "" + crypto.SHA256(password);
  console.log(email, encryptedPassword);
  const statement = `select uid,fname,lname,dob,gender,email,role,status from user where email="${email}" and password='${encryptedPassword}';`;
  try {
    db.execute(statement, (err, data) => {
      // console.log(data, " ", err);
      const result = { status: "" };
      if (err != null) {
        result["status"] = "error";
        result["error"] = err;
      } else {
        if (data.length == 0) {
          result["status"] = "error";
          result["error"] = "**User dosen't exist";
        } else {
          const user = data[0];
          if (user.status === 0) {
            result["status"] = "error";
            result["error"] =
              "**Your Account is not Verified !!!! \n****Please Contact to Administrator";
          } else {
            if (user.status === 2) {
              result["status"] = "error";
              result["error"] =
                "**Your Account is deactivated!!!! \n****Please Contact to Administrator";
            } else {
              const token = jwt.sign(user, process.env.SECRET);
              result["status"] = "success";
              result["token"] = token;
            }
          }
          console.log(user);
        }
      }
      response.send(result);
    });
  } catch (error) {
    console.log(error);
    response.status(501).send();
  }
});

app.post("/api/register", (request, response) => {
  console.log(request);
  const { fname, lname, email, password, dob, gender } = request.body;
  const encryptedPassword = "" + crypto.SHA256(password);
  const statement = `insert into user (fname, lname, email, password, dob ,gender) values ("${fname}","${lname}","${email}","${encryptedPassword}","${dob}","${gender}");`;
  try {
    db.execute(statement, (error, data) => {
      const result = {
        status: "",
      };

      if (error != null) {
        // there is an error while performing the operation
        result["status"] = "error";
        result["error"] = "User already registered";
        response.status(400);
      } else {
        // there is no error
        const user = {
          fname: fname,
          lname: lname,
          email: email,
        };

        const resetToken = jwt.sign(user, process.env.SECRET);
        const resetPasswordUrl = `http://localhost:3000/verify/${resetToken}`;
        console.log(resetPasswordUrl);
        const message = `Your account is successfully created. Please click below link to verify your account :- \n\n ${resetPasswordUrl} `;
        sendEmail({
          email: email,
          subject: "Verify your account",
          message: message,
        });
        result["status"] = "success";
        result["token"] = resetToken;

        console.log("New user added");
      }
      response.send(result);
    });
  } catch (ex) {
    console.log(ex);
  }
});

app.patch("/api/profile", (req, res) => {
  const uid = req.userID;
  const { fname, lname, email, dob, gender } = req.body;

  const statement = `update user set fname="${fname}", lname="${lname}", email="${email}" , dob="${dob}", gender="${gender}" where uid=${uid};`;
  try {
    db.execute(statement, (error, data) => {
      const result = {
        status: "",
      };

      if (error != null) {
        // there is an error while performing the operation
        result["status"] = "error";
        result["error"] = "Invalid credentials!!";
        res.status(400);
      } else {
        // there is no error
        console.log(data);
        const user = {
          fname: fname,
          lname: lname,
          email: email,
          dob: dob,
          gender: gender,
          uid: uid,
        };
        const token = jwt.sign(user, process.env.SECRET);
        result["status"] = "success";
        result["token"] = token;
        console.log("User updated");
      }
      res.send(result);
    });
  } catch (ex) {
    console.log(ex);
  }
});

app.patch("/api/profile/change/password", async (req, res) => {
  const uid = req.userID;
  const { password, updatePassword } = req.body;
  console.log(password, updatePassword, req.body);
  const encryptedPassword = "" + crypto.SHA256(password);
  const encryptedUpdatedPassword = "" + crypto.SHA256(updatePassword);
  const validStatement = `select * from user where password="${encryptedPassword}" and uid=${uid};`;
  const statement = `update user set password="${encryptedUpdatedPassword}" where uid=${uid} and password='${encryptedPassword}';`;
  console.log(statement);
  try {
    await db.execute(validStatement, (error, data) => {
      const result = {
        status: "",
      };
      if (error != null) {
        console.log(error);
      } else {
        console.log(data);
        if (data.length === 0) {
          result["status"] = "error";
          result["message"] = "Invalid Credential";
          res.status(400).send(result);
        } else {
          try {
            db.execute(statement, (error, data) => {
              if (error != null) {
                result["status"] = "error";
                result["error"] = "Invalid credentials!!";
                res.status(400);
              } else {
                result["status"] = "success";
                result["message"] = "Password successfully updated";
                console.log("User updated");
              }
              res.send(result);
            });
          } catch (ex) {
            console.log(ex);
          }
        }
      }
    });
  } catch (error) {
    console.log("error");
  }
  console.log(validStatement);
});

app.patch("/api/profile/deactivate", async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = "" + crypto.SHA256(password);
  const validStatement = `select * from user where email="${email}" and password='${encryptedPassword}';`;
  const statement = `update user set status= 2  where email="${email}" and password='${encryptedPassword}';`;
  console.log(validStatement);
  try {
    await db.execute(validStatement, (error, data) => {
      const result = {
        status: "",
      };
      if (error != null) {
        console.log(error);
      } else {
        console.log(data);
        if (data.length === 0) {
          result["status"] = "error";
          result["message"] = "Invalid Credential";
          res.status(400).send(result);
        } else {
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
                result["message"] = "Account is succesfully deactivated";
              }
              res.send(result);
            });
          } catch (ex) {
            console.log(ex);
          }
        }
      }
    });
  } catch (error) {
    console.log("error");
  }
  console.log(validStatement);
});

app.delete("/api/profile/delete/:uid", (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  try {
    db.execute(`delete from user where uid=${uid};`, (err, data) => {
      const result = { status: "" };
      if (err != null) {
        result["status"] = "error";
        result["error"] = err;
        res.status(501);
      } else {
        if (data.length == 0) {
          result["status"] = "error";
          result["error"] = "User not found";
        } else {
          result["status"] = "success";
          result["message"] = "Your account is deleted successfully";
          res.status(200);
        }
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/profile/change/reset", async (req, res) => {
  const { uid, password } = req.body;
  const encryptedPassword = "" + crypto.SHA256(password);

  const validStatement = `select * from user where uid=${uid};`;
  const statement = `update user set password="${encryptedPassword}" where uid=${uid};`;
  console.log(statement);
  try {
    await db.execute(validStatement, (error, data) => {
      const result = {
        status: "",
      };
      if (error != null) {
        console.log(error);
      } else {
        console.log(data);
        if (data.length === 0) {
          result["status"] = "error";
          result["message"] = "Invalid Credential";
          res.status(400).send(result);
        } else {
          try {
            db.execute(statement, (error, data) => {
              if (error != null) {
                result["status"] = "error";
                result["error"] = "Invalid credentials!!";
                res.status(400);
              } else {
                result["status"] = "success";
                result["message"] = "Password successfully updated";
                console.log("User updated");
              }
              res.send(result);
            });
          } catch (ex) {
            console.log(ex);
          }
        }
      }
    });
  } catch (error) {
    console.log("error");
  }
  console.log(validStatement);
});

app.post("/api/profile/forgot", async (req, res) => {
  const { email } = req.body;
  const statement = `select * from user where email="${email}";`;
  try {
    await db.execute(statement, (error, data) => {
      const result = {
        status: "",
      };
      if (error != null) {
        console.log(error);
      } else {
        console.log(data);
        if (data.length === 0) {
          result["status"] = "error";
          result["message"] = "Invalid Credential";
          res.status(400).send(result);
        } else {
          if (error != null) {
            result["status"] = "error";
            result["error"] = "Invalid credentials!!";
            res.status(400);
          } else {
            const user = data[0];
            console.log(user);
            const resetToken = jwt.sign(user, process.env.SECRET);
            const resetPasswordUrl = `http://localhost:3000/reset/${resetToken}`;
            console.log(resetPasswordUrl);
            const message = `Your reset password link is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

            sendEmail({
              email: email,
              subject: "Recovery Password",
              message: message,
            });
            result["status"] = "success";
            result["message"] =
              "Email is sent successfully on registered e-mail";
            console.log("User updated");
          }
          res.send(result);
        }
      }
    });
  } catch (error) {
    console.log("error");
  }
});

app.patch("/api/profile/change/verify", async (req, res) => {
  const { email } = req.body;
  const validStatement = `select * from user where email="${email}";`;
  const statement = `update user set status= 1  where email="${email}";`;
  console.log(validStatement);
  try {
    await db.execute(validStatement, (error, data) => {
      const result = {
        status: "",
      };
      if (error != null) {
        console.log(error);
      } else {
        console.log(data);
        if (data.length === 0) {
          result["status"] = "error";
          result["message"] = "Invalid Credential";
          res.status(400).send(result);
        } else {
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
                result["message"] = "Account is succesfully verified";
              }
              res.send(result);
            });
          } catch (ex) {
            console.log(ex);
          }
        }
      }
    });
  } catch (error) {
    console.log("error");
  }
  console.log(validStatement);
});

module.exports = app;
