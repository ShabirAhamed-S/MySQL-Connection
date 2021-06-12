const express = require('express');
const mysql = require('mysql');
//const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

//Using Postman

//app.use(cors());
app.use(bodyparser.json());


app.listen(process.env.PORT, () => {
    console.log('server is running....',process.env.PORT);
})



// mysql database connection 

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
});

// check db connection 
db.connect((err) => {
    if (err) throw err;
    else {
        console.log('database connected ....');
    }
});


// REST API CURD

app.get('/api', (req, res) => {
    res.send('Api working');
});


// Create data 

app.post('/api/create', (req, res) => {

    console.log(req.body);

    // sql query 

    let sql = ` INSERT INTO mytb(Name,Address,PhoneNumber)
                VALUES('${req.body.Name}','${req.body.Address}','${req.body.PhoneNumber}')
               `;
    // run query 
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('data inserted');
    });


});


// Read data 
app.get('/api/read', (req, res) => {
    // sql query 
    let sql = `SELECT * FROM mytb`;
    // run query 
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

// Read single data 
app.get('/api/read/:Name', (req, res) => {
    console.log(req.params.id);
    // sql query 
    let sql = `SELECT * FROM mytb
                WHERE Name = '${req.params.Name}'
                `;
    // run query 
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });


});

// update single data 

app.put('/api/update/:Name', (req, res) => {
    console.log(req.params.Name);
    // sql query 
    let sql = `UPDATE mytb SET 
                    PhoneNumber = '${req.body.PhoneNumber}'
                    WHERE Name = '${req.body.Name}'
                    `;
    // run query 
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('data updated');
    })
})


// delete single data 

app.delete('/api/delete/:Name', (req, res) => {

    // sql query 
    let sql = `DELETE FROM mytb 
                WHERE Name = '${req.params.Name}'
                `;
    //    run query 
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('data deleted');
    });
});