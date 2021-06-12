let mysql = require('mysql');

let con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb1",
  connectionLimit: 10
});

let sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), mobile VARCHAR(255))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

//Insert Values
sql = "INSERT INTO customers (name, mobile) VALUES ?";
var values = [
  ['shabir', 'Redmi'],
  ['abu', 'Oneplus'],
  ['ameer', 'Oneplus'],
  ['gautam', 'Mountain 21'],
  ['arvind', 'Nokia'],
  ['akash', 'Poco'],
  ['yuvan', 'Micromax']
];
con.query(sql, [values], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});

//Select 
con.query("SELECT * FROM customers", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});
con.query("SELECT * FROM customers WHERE mobile = 'Oneplus'", function (err, result) {
  if (err) throw err;
  console.log(result);
});

//Update
sql = "UPDATE customers SET mobile = 'RedmiNote 5pro' WHERE mobile = 'Redmi'";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
});

//Orderby
con.query("SELECT * FROM customers ORDER BY name", function (err, result) {
  if (err) throw err;
  console.log(result);
});

//Limit 4
sql = "SELECT * FROM customers LIMIT 4";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});

//Delete
sql = "DELETE FROM customers WHERE mobile = 'Nokia'";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Number of records deleted: " + result.affectedRows);
});

//Drop Table
sql = "DROP TABLE customers";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table deleted");
});