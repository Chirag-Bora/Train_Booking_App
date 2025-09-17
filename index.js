require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const authRoutes = require("./src/routes/authRoutes")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/',authRoutes);


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "register.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/search", (req, res) => res.sendFile(path.join(__dirname, "public", "search.html")));


 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
