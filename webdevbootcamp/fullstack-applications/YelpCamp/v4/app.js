const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    propertiesReader = require('properties-reader'),
    properties = propertiesReader('app.properties'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    initDbSampleData = require("./initDbSampleData");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// __dirname -> The current directory
// Instead of using relative path, like static("public"), we are going for (kind of) absolute path
app.use(express.static(`${__dirname}/public`));

const databaseHost = properties.get("db.host");
const databaseName = properties.get("db.database");
mongoose.connect(databaseHost + databaseName);
initDbSampleData();
app.get("/", (req, res) => {
    res.render("landing");
});
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campData) => {
        if (err) {
            console.log("Find failed");
            res.redirect("/error");
        } else {
            console.log(campData);
            res.render("index", {
                campData
            });
        }
    });
});
app.post("/campgrounds", (req, res) => {
    let camp = {
        name: req.body.campName,
        image: req.body.campImage,
        description: req.body.campDescription
    };
    Campground.create(camp, (err, result) => {
        if (err) {
            console.log('Error saving[', camp, '] [', err, ']');
            res.redirect("/error");
        } else {
            console.log('Campground is saved', result);
            res.redirect("/campgrounds");
        }
    });
});
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});
app.get("/campgrounds/:id", (req, res) => {
    let id = req.params.id;
    Campground.findById(id).populate('comments').exec((err, result) => {
        if (err) {
            console.log("Error finding campground with id", id);
            res.redirect("/error");
        } else {
            res.render("show", {
                result
            });
        }
    });
});
app.post('/campgrounds/:id/comments', (req, res) => {
    console.log('Creating a new comment ', req.body);
    let id = req.params.id;
    let comment = req.body;
    let commentResponse = {};
    Campground.findById(id, (err, campgroundResult) => {
        let errorMsg;
        if (!campgroundResult) {
            errorMsg = `Can not find the campground with id: ${id}`;
            console.log(errorMsg);
            commentResponse.error = errorMsg;
            res.status(404).json(commentResponse);
        } else if (err) {
            errorMsg = `Error in finding the campground with id: ${id}`;
            console.log(errorMsg);
            commentResponse.error = err;
            res.status(500).json(commentResponse);
        }
        Comment.create(comment, function (err, commentResult) {
            if (err || !commentResult) {
                errorMsg = `Error creating the comment: ${comment}`;
                console.log(errorMsg);
                console.log(err);
                commentResponse.error = err;
                res.status(500).json(commentResponse);
            } else {
                campgroundResult.comments.push(commentResult._id);
                campgroundResult.save();
                console.log("Created new comment and added to the campground", commentResult);
                res.json(commentResult);
            }
        });
    });
});

app.listen(8000, () => console.log("YelpCamp v4.0 has started and listening at 8000"));