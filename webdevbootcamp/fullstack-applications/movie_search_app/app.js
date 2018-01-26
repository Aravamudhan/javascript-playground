var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static("public"));

let url = "http://www.omdbapi.com/?apikey=thewdb&s=";

app.get("/", (req, res) => res.render("home"));

app.get("/movies", (req, res) => {
    console.log("Search for", req.query.search);
    request(url + req.query.search, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let results = JSON.parse(body)
            res.json(results["Search"]);
        } else {
            res.send(error);
        }
    });
});

app.listen(8000, () => console.log("Server started and listening at 8000"));