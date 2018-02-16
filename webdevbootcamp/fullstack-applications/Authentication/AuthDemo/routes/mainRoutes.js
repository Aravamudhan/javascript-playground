const express = require('express'),
    router = express.Router();

function handleDefaultRoute(req, res) {
    if (req.isAuthenticated()) {
        res.locals.isUserLoggedIn = true;
    } else {
        res.locals.isUserLoggedIn = false;
    }
    res.render('home');
}

function handleDashboardRouter(req, res) {
    let userDetail = {};
    if (req.session && req.session.passport && req.session.passport.user) {
        userDetail.username = req.session.passport.user;
        res.render('dashboard', {
            userDetail
        });
    } else {
        console.log("There is user in the session");
        res.render('/login')
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.isUserLoggedIn = true;
        return next();
    }
    res.locals.isUserLoggedIn = false;
    res.redirect("/login");
}

router.get('/', handleDefaultRoute);

router.get('/dashboard', isLoggedIn, handleDashboardRouter);

module.exports = router;