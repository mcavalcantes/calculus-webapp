const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "/..")));

app.get("/", (req, res) => {
    let filePath = path.join(__dirname, "/../login-register.html");
    res.sendFile(filePath);
});

app.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    res.send("Success!");
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});