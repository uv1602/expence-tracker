const express = require("express");
const db = require("./db");
const router = express.Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("./config");


// remember the role of colon
router.put("/user/verify/:id", (request, response) => {
  const { id } = request.params;
  var statement = `update us set status=1  where id = ${id}`;
  console.log(statement);
  result = {
    status: "",
  };
  try {
    db.execute(statement, (error, data) => {
      if (error) {
        result["status"] = "error";
        result["error"] = error;
      } else {
        result["status"] = "success";
        result["data"] = data;
      }
      response.send(result);
    });
  } catch (ex) {
    response.send({
      status: "error",
      error: "unauthorized access",
    });
  }
});

router.patch("/user/verify/:id", (request, response) => {
  const { id } = request.params;
  const status = request.body.status;

  var statement = `update us set status=${status} where id = ${id};`;
  var result = {
    status: "",
  };

  db.execute(statement, (error, data) => {
    if (error) {
      result.status = "error";
      result.error = error;
    } else {
      result.status = "success";
      result.data = data;
    }
    response.send(result);
  });
});

router.get("/user/profile/:id", (request, response) => {
  try {
    // const token = request.headers.token
    // console.log(token)
    const {id} = request.params
    // const data = jwt.verify(token,config.secert)
    // const id = data.id
    console.log(id);
    var statement = `select * from us where id='${request.userID}';`;
    try {
      db.execute(statement, (error, users) => {
        const result = {
          status: "",
        };

        if (error != null) {
          // there is an error while performing the operation
          result["status"] = "error";
          result["error"] = error;
        } else {
          // there is no error
          if (users.length == 0) {
            result["status"] = "error";
            result["error"] = "User does not exist";
            response.status("400");
          } else {
            const user = users[0];
            result["status"] = "success";
            result["data"] = {
              id: user["id"],
              firstName: user["firstName"],
              lastName: user["lastName"],
              email: user["email"],
              phone: user["phone"],
            };
            response.status("200");
          }
        }
        response.send(result);
        // console.log(statement)
        // response.send(users)
      });
    } catch (ex) {
      console.log(ex);
    }
  } catch (ex) {
    response.status("500");
    response.send({
      status: "error",
      error: "unauthorized access",
    });
  }
});

router.post("/user/signup", (request, response) => {
  console.log(request.body);
  const { firstName, lastName, email, password } = request.body;
  const encryptedPassword = "" + crypto.SHA256(password);
  const statement = `insert into us (firstName, lastName, email, pass, status) values ("${firstName}","${lastName}","${email}","${encryptedPassword}", 0 );`;
  try {
    db.execute(statement, (error, data) => {
      // result
      const result = {
        status: "",
      };

      if (error != null) {
        // there is an error while performing the operation
        result["status"] = "error";
        result["error"] = error;
      } else {
        // there is no error
        result["status"] = "success";
        result["data"] = data;
        console.log(email + " " + password);
        console.log("new user added");
      }
      response.send(result);
    });
  } catch (ex) {
    console.log(ex);
  }
});

router.post("/user/signin", (request, response) => {
  console.log(request.log);
  const { email, password } = request.body;
  const encryptedPassword = "" + crypto.SHA256(password);
  var statement = `select * from us where email='${email}' and pass = '${encryptedPassword}';`;
  // console.log(statement)
  try {
    db.execute(statement, (error, users) => {
      console.log(users);

      const result = {
        status: "",
      };

      if (error != null) {
        // there is an error while performing the operation
        result["status"] = "error";
        result["error"] = error;
      } else {
        // there is no error
        if (users.length == 0) {
          result["status"] = "error";
          result["error"] = "User does not exist";
        } else {
          const user = users[0];
          const token = jwt.sign({ id: user.id }, config.secret);

          if (user.status == 0) {
            result.status = "error";
            result.error =
              "User is not verified!!!! Please verify your account";
          } else if (user.status == 2) {
            result.status = "error";
            result.error =
              "Your account is suspended !!!!! Please contact to administor";
          } else {
            result["status"] = "success";
            result["data"] = {
              token: token,
              id: user["id"],
              firstName: user["firstName"],
              lastName: user["lastName"],
              email: user["email"],
              phone: user["phone"],
            };
          }
        }
      }
      response.send(result);
      // console.log(statement)
      // response.send(users)
    });
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
