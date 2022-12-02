const mysql = require("mysql");

const pool = mysql.createConnection({
  host: "localhost",
  port: "4000",
  user: "root",
  password: "",
  database: "agenda",
});

module.exports = pool;
