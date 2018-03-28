const express = require("express"),
    passport = require("passport"),
    User = require("../models/user"),
    router = express.Router(),
    middlewares = require("../middleware");

function renderLandingPage(req, res) {
    res.render("landing");
}

function renderRegisterationPage(req, res) {
    res.render("register");
}

function registerUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.register(new User({
        username
    }), password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            // If I use render instead of redirect, the flash message is not working
            // The main reason could be setLoggedInUser middleware not getting called if we render
            // instead of redirect
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success","Hello "+user.username+"! Welcome to Yelpcamp");
                res.redirect("/campgrounds");
            });
        }
    });
}

function renderLoginPage(req, res) {
    res.render("login");
}

function loginUser(req, res) {}

function logoutUser(req, res) {
    req.logout();
    req.flash("success", "You are logged out successfully!");
    res.redirect("/");
}
router.get("/", renderLandingPage);
router.get("/register", renderRegisterationPage);
router.post("/register", registerUser);
router.get("/login", renderLoginPage);
router.post("/login", middlewares.authMiddleWare, loginUser);
router.get("/logout", logoutUser);
module.exports = router;