let mysql = require('mysql');
const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')

var app = express();

let con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  insecureAuth: true,
  connectionLimit: 1
});

var PORT = 8081

/// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Create database
app.get('/process_get', function (req, res) {
  let value = req.query.db_name
  let sql = `CREATE DATABASE ${value}`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    res.send('database created')
  });
})
app.listen(PORT)