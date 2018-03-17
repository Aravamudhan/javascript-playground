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
        description: req.body.campDescription,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
    Campground.create(camp, (err, result) => {
        if (err) {
            console.log('Error saving[', camp, '] [', err, ']');
            res.redirect("/error");
        } else {
            console.log('Campground is saved');
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

function renderEditCampground(req, res) {
    let id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if (err) {
            console.log("Error finding campground with id", id);
            let errorMessage = "Error finding the campground for you. Try again later.";
            res.redirect("/error?errorMessage=" + errorMessage);
        } else {
            res.render("edit", {
                campground
            });
        }
    });
}

function editCampground(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            console.log("Error finding campground with id", id);
            let errorMessage = "Error finding and updating the campground";
            res.redirect("/error?errorMessage=" + errorMessage);
        } else {
            res.redirect("/campgrounds/" + campground._id);
        }
    });
}

function deleteCampground(req, res) {
    let id = req.params.id
    Campground.findById(id, (err, result) => {
        if (err || !result) {
            console.log("Error finding campground with id", id);
            res.redirect("/error");
        } else {
            result.remove();
            res.redirect("/campgrounds");
        }

    });
}

function checkAuthorization(req, res, next) {
    if (req.isAuthenticated()) {
        let id = req.params.id;
        Campground.findById(id, (err, campground) => {
            if (err) {
                let errorMessage = "Error finding campground";
                console.log("Error finding campground with id", id);
                res.redirect("/error?errorMessage=" + errorMessage);
            } else {
                // The campground.author.id is not a string. To compare that with user._id equals method
                // has to be used
                if (campground && campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    let errorMessage = "You do not have the permission to access this resource. You are not the owner of this resource.";
                    res.redirect("/error?errorMessage=" + errorMessage);
                }
            }
        });
    } else {
        let errorMessage = "You are not authenticated to perform this operation";
        res.redirect("/error?errorMessage=" + errorMessage);
    }
}

router.get("/", renderCampgrounds);
router.post("/", loginMiddleWare.isLoggedInPage, createCampground);
router.get("/new", loginMiddleWare.isLoggedInPage, renderCreateCampground);
router.get("/:id", renderCampground);
router.get("/:id/edit", checkAuthorization, renderEditCampground);
router.put("/:id", checkAuthorization, editCampground);
router.delete("/:id", checkAuthorization, deleteCampground);
module.exports = router;