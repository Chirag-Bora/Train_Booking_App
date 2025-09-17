
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({
         message: "DB Error", 
         error: err }
        );

      res.json({ message: "User registered successfully", userId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ message: "Error hashing password" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
  

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,               
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );

      res.json({ message: "Login successful", token });
    } catch (compareErr) {
      console.error("Password compare error:", compareErr);
      res.status(500).json({ message: "Error comparing passwords", error: compareErr });
    }
  });
};

exports.search = (req, res) => {
  res.json({ message: "Welcome to Train Search Page", user: req.user });
};
