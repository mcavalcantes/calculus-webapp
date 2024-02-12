const express = require("express");
const app = express();

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.get("/", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("../login-register.html"));
});

app.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    res.send("Data succesfully received");
});

app.listen(3000);