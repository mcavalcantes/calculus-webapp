const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());       
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../"));

//

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/test", (err, client) => {
    if (err) throw err;

    const db = client.db("test");

    db.collection("testCollection").find().toArray((err, result) => {
        if (err) throw err;

        console.log(result);
    });
});

//

app.get("/", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("../login-register.html"));
});

app.post("/", (req, res) => {
    // Process user input
    res.send("Data received");
});

app.listen(port, () => {
    console.log("App started and listening to port " + port);
});