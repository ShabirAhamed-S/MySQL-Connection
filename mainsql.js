let mysql = require('mysql');

let con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  insecureAuth: true,
  connectionLimit: 10
});

let sql = "CREATE DATABASE mydb1"
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Database created");
});