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
function setLoggedInUser(req, res, next) {
    res.locals.currentUser = req.user;
    next();
}

module.exports = {
    isLoggedInAjax,
    isLoggedInPage,
    setLoggedInUser
}