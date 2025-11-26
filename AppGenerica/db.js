const mysql = require('mysql2/promise')
const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '3137532085',
    database: 'dbprueba'
})
module.exports = mysqlPool