const express = require('express'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    router = express.Router(),
    middlewares = require("../middleware"),
    NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);
let MAP_API_KEY = process.env.GOOGLEMAP_API_KEY;

function renderCampgrounds(req, res) {
    Campground.find({}, (err, campData) => {
        if (err) {
            console.log("Find failed", err);
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
        price: req.body.campPrice,
        image: req.body.campImage,
        description: req.body.campDescription,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
    const locationObj = JSON.parse(req.body.campLocation);
    geocoder.geocode(locationObj.name, function name(err, data) {
        if (err || !data.length) {
            console.error(err);
            req.flash("error", "Invalid location");
            return res.redirect("back");
        }
        camp.location = locationObj.name;
        camp.lat = locationObj.lat;
        camp.lng = locationObj.lng;
        console.log("Saving", camp);
        Campground.create(camp, (err, result) => {
            if (err) {
                console.log('Error saving[', camp, '] [', err, ']');
                res.redirect("/error");
            } else {
                console.log('Campground is saved');
                res.redirect("/campgrounds");
            }
        });
    });
}

function renderCreateCampground(req, res) {
    res.render("new", {
        MAP_API_KEY
    });
}

function renderCampground(req, res) {
    let id = req.params.id;
    Campground.findById(id).populate('comments').exec((err, result) => {
        if (err) {
            console.log("Error finding campground with id", id, err);
            res.redirect("/error");
        } else {
            res.render("show", {
                result,
                MAP_API_KEY
            });
        }
    });
}

function renderEditCampground(req, res) {
    let id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if (err) {
            console.log("Error finding campground with id", id, err);
            let errorMessage = "Error finding the campground for you. Try again later.";
            res.redirect("/error?errorMessage=" + errorMessage);
        } else {
            let action = "/campgrounds";
            let formTitle = "Editing the campground details";
            res.render("edit", {
                campground,
                MAP_API_KEY
            });
        }
    });
}

function editCampground(req, res) {
    const locationObj = JSON.parse(req.body.campground.location);
    geocoder.geocode(locationObj.name, function (err, data) {
        if (err || !data.length) {
            console.log(err);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.campground.location = locationObj.name;
        req.body.campground.lat = locationObj.lat;
        req.body.campground.lng = locationObj.lng;

        Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
            if (err) {
                console.log("Error finding campground with id", id);
                console.error(err);
                let errorMessage = "Error finding and updating the campground";
                res.redirect("/error?errorMessage=" + errorMessage);
            } else {
                res.redirect("/campgrounds/" + campground._id);
            }
        });
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