
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"beer"
});

connection.connect((err)=>{
    if(err){
        return connection.end();
    }
    console.log('Connected to database.');
});

module.exports = connection;