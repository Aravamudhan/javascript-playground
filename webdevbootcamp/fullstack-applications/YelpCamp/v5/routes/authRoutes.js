const express = require("express"),
    passport = require("passport"),
    User = require("../models/user"),
    router = express.Router();

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
            res.render("register", {
                error: err.message
            });
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/campgrounds");
            });
        }
    });
}

function renderLoginPage(req, res) {
    res.render("login");
}

function loginUser(req, res) {

}

function logoutUser(req, res) {
    req.logout();
    res.redirect("/");
}
let authMiddleWare = passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
});
router.get("/", renderLandingPage);
router.get("/register", renderRegisterationPage);
router.post("/register", registerUser);
router.get("/login", renderLoginPage);
router.post("/login", authMiddleWare, loginUser);
router.get("/logout", logoutUser);
module.exports = router;