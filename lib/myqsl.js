const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "levent_app"
})

connection.connect()


module.exports = {
    db: connection
}