const mysql = require('mysql2');

//create a connection pool

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port:3306,
    user:'root',
    password: 'root',
    database:'mean_backend'
});

module.exports = pool.promise(); //use promise mode for async/await support
