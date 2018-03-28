const express = require('express'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    router = express.Router(),
    middlewares = require("../middleware");

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

router.get("/", renderCampgrounds);
router.post("/", middlewares.isLoggedInPage, createCampground);
router.get("/new", middlewares.isLoggedInPage, renderCreateCampground);
router.get("/:id", renderCampground);
router.get("/:id/edit", middlewares.checkCampgroundAuthorization, renderEditCampground);
router.put("/:id", middlewares.checkCampgroundAuthorization, editCampground);
router.delete("/:id", middlewares.checkCampgroundAuthorization, deleteCampground);
module.exports = router;