function isLoggedInAjax(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        message: "Unauthorized"
    });
}

function isLoggedInPage(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
// To set the loggedin user to use in the templates
// This is currently being set in the app.js
function setLoggedInUser(req, res, next) {
    res.locals.currentUser = req.user;
    next();
}

module.exports = {
    isLoggedInAjax,
    isLoggedInPage,
    setLoggedInUser
}