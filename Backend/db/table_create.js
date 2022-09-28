var mysql = require("mysql2");
require("dotenv").config("../.env");

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

function create_table(statement) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(statement, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
}
module.exports = create_table;
