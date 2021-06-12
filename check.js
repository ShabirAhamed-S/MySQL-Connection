let mysql = require('mysql');
const express = require('express')
const path = require('path')
const helmet = require("helmet");
const bodyparser = require('body-parser')

var app = module.exports = express(helmet());

let con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sec',
  insecureAuth: true,
  connectionLimit: 15
});
var PORT = 8081

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, function (error) {
  if (error) throw error
  console.log("Server created Successfully on PORT ", PORT)
})

var bodyParser = require('body-parser');
const { query } = require('express');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Create table
app.get('/process_create', function (req, res) {
  let value = req.query.tb_name
  let obj = req.query.obj
  let sql = `CREATE TABLE ${value}(` + `${obj}` + ')'
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result))
  });
})

//Insert values
app.get('/process_insert', function (req, res) {
  let obj = {
    title: req.query.obj,
    name: req.query.name
  }
  let table = req.query.tb_name
  let sql = `INSERT INTO ${table} SET ?`
  con.query(sql, obj, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });
})

//Select values
app.get('/process_select', function (req, res) {
  let table = req.query.tb_name
  let sql = `select * from ${table}`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result))
  });
})

//Update table
app.get('/process_update', function (req, res) {
  let table = req.query.tb_name
  let title = req.query.obj
  let name = req.query.name
  let new1 = req.query.new
  sql = `UPDATE ${table} SET ${title} = '${new1}' WHERE ${title} = '${name}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(JSON.stringify(result.affectedRows))
  });
})

//Orber by value
app.post('/process_order', urlencodedParser, function (req, res) {
  con.query("SELECT * FROM tables ORDER BY title", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });
})

//Delete Value
app.post('/process_delete', urlencodedParser, function (req, res) {
  sql = "DELETE FROM tables WHERE title = 'Shabir Ahamed S'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    res.send("Number of records deleted: " + result.affectedRows)
  });
})

//Drop table
app.get('/process_drop', function (req, res) {
  let table = req.query.tb_name
  sql = `DROP TABLE ${table}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
    res.send("Table deleted")
  });
})