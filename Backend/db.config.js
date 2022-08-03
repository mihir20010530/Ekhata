const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo'
});

dbConn.connect(function(error){
    if(error) throw error;
    else console.log("Database Connected");
})

module.exports = dbConn;