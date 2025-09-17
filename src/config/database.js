const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",         
  password: "565656", 
  database: "train_booking"
});

db.connect((err) => {
  if (err) {
    console.error(" MySQL connection error:", err.message);
  } else {
    console.log("MySQL Connected successfully");
  }
});

module.exports = db;
