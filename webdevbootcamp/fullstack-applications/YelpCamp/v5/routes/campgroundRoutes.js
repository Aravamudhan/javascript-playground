const express = require('express'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    router = express.Router(),
    loginMiddleWare = require("./loginUtility");

function renderCampgrounds(req, res) {
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
}

function createCampground(req, res) {
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
}

function renderCreateCampground(req, res) {
    res.render("new");
}

function renderCampground(req, res) {
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
}

function createComment(req, res) {
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
}

router.get("/", renderCampgrounds);
router.post("/", createCampground);
router.get("/new", renderCreateCampground);
router.get("/:id", renderCampground);
module.exports = router;