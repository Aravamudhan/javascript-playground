const express = require("express"),
    passport = require("passport"),
    User = require("../models/user"),
    router = express.Router();

function handleRegisterationView(req, res) {
    res.render("register");
}

function handleRegisterationForm(req, res) {
    console.log("handleRegisterationForm............");
    let username = req.body.username;
    let password = req.body.password;
    // The passport takes care of registeration
    // The register method takes the username and password as the input
    // It hashes the password and stored the hashed value along with the username in the database
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
                res.redirect("/dashboard");
            });
        }
    });

}

function handleLoginView(req, res) {
    res.render("login");
}

function handleLoginForm(req, res) {

}

function handleLogout(req, res) {
    req.logout();
    res.redirect("/");
}

let authMiddleWare = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
});

router.get("/register", handleRegisterationView);

router.post("/register", handleRegisterationForm);

router.get("/login", handleLoginView);

router.post("/login", authMiddleWare, handleLoginForm);

router.get("/logout", handleLogout);

module.exports = router;