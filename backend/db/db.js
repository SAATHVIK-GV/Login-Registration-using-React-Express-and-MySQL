const db = require("mysql2");


const connectDb = db.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employmanag"
});

module.exports = connectDb;
