const express = require("express");
const db = require("./db/db");
const app = express.Router();

app.get("/api/show", (req, res) => {
  const id = req.userID;
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/;`;
  // const resetPasswordUrl = `${req.protocol}://${req.hostname}:3000/reset/;`;
  // console.log(resetPasswordUrl);
  try {
    db.execute(
      `select eid id, cat_name,  date_format(date,'%d/%m/%Y') as date,amount, uid from expense where uid="${id}";`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "category name dosen't exist";
          } else {
            result["status"] = "success";
            console.log(data);
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

app.post("/api/add", (request, response) => {
  const id = request.userID;
  console.log(request.body);
  const { cat_name, amount, date } = request.body;
  const statement = `insert into expense (cat_name, uid, amount, date) values ("${cat_name}","${id}","${amount}","${date}");`;
  console.log(statement);
  try {
    db.execute(statement, (err, data) => {
      const result = { status: "" };
      if (err != null) {
        result["status"] = "error";
        result["error"] = err;
      } else {
        if (data.length == 0) {
          result["status"] = "error";
          result["error"] = "category dosen't exist";
        } else {
          const user = data[0];
          result["status"] = "success";
          result["data"] = user;
        }
      }
      response.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// select * from expense where date=curdate();
app.get("/api/show/today", (req, res) => {
  // const { uid } = req.params;
  const id = req.userID;
  try {
    db.execute(
      `select * from expense where date=curdate() and uid=${id};`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "category name dosen't exist";
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

app.get("/api/show/yesterday", (req, res) => {
  // const { uid } = req.params;
  const id = req.userID;
  try {
    db.execute(
      `select * from expense where date=DATE_SUB(CURDATE(),INTERVAL 1 DAY) and uid=${id};`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "category name dosen't exist";
          } else {
            result["status"] = "success";
            // console.log(data);
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

// select cat_name,sum(amount) from expense where uid = 1 group by cat_name ;
app.get("/api/show/categories", (req, res) => {
  const id = req.userID;
  try {
    db.execute(
      `select cat_name,sum(amount) price from expense where uid = ${id} group by cat_name ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "category name dosen't exist";
          } else {
            result["status"] = "success";
            const cat = [];
            const price = [];
            data.map((item, key) => {
              cat.push(item.cat_name);
              price.push(item.price);
            });

            result["result"] = { categories: cat, price: price };
            console.log(result);
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/delete/:eid", (req, res) => {
  const { eid } = req.params;
  const id = req.userID;
  try {
    db.execute(
      `delete from expense where uid=${id} and eid =${eid} ;`,
      (err, data) => {
        const result = { status: "" };
        if (err != null) {
          result["status"] = "error";
          result["error"] = err;
        } else {
          if (data.length == 0) {
            result["status"] = "error";
            result["error"] = "Expense not found";
          } else {
            result["status"] = "success";
            result["result"] = "Expense is deleted successfully";
          }
        }
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;
