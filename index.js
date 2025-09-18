require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for static file 
app.use(express.static(path.join(__dirname, "public")));


// Api routes
const authRoutes = require("./src/routes/authRoutes")
app.use('/auth',authRoutes);

// Route to serve Register UI page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"))
});

//Routes to Serve Login UI page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"))
});
// Routes to Serve Search file
app.get("/search", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "search.html"))
});


 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
