const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    User = require("./models/user");

module.exports.createApp = function createApp() {
    mongoose.connect("mongodb://localhost/authpassportdemo");
    app = express();
    app.use(express.static(`${__dirname}/public`));
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(expressSession({
        secret: "This is the SECRET WORD",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    // Reading the data from session, decoding it and encoding it
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(require("./routes/mainRoutes"));
    app.use(require("./routes/authRoutes"));
    return app;
}