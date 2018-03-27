const passport = require("passport"),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');
// All middlewares in one place
const middlewares = {};
middlewares.isLoggedInAjax = function isLoggedInAjax(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        message: "Unauthorized"
    });
}

middlewares.isLoggedInPage = function isLoggedInPage(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
// To set the loggedin user to use in the templates
// This is currently being set in the app.js
middlewares.setLoggedInUser = function setLoggedInUser(req, res, next) {
    res.locals.currentUser = req.user;
    next();
}
middlewares.authMiddleWare = passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
});
middlewares.checkCampgroundAuthorization = function checkCampgroundAuthorization(req, res, next) {
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

middlewares.checkCommentAuthorization = function checkCommentAuthorization(req, res, next) {
    if (req.isAuthenticated()) {
        let commentId = req.body._id;
        Comment.findById(commentId, (err, commentResult) => {
            if (err) {
                let error = "Error finding comment";
                console.log("Error finding campground with id", id);
                res.status(404).json({
                    error
                });
            } else {
                if (commentResult && commentResult.author.username == req.user.username) {
                    next();
                } else {
                    let error = "You do not have the permission to access this resource. You are not the owner of this resource.";
                    res.status(403).json({
                        error
                    });
                }
            }
        });
    } else {
        let error = "You are not authenticated to perform this operation";
        res.status(401).json({
            error
        });
    }
}
module.exports = middlewares;