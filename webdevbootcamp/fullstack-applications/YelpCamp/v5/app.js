const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    propertiesReader = require('properties-reader'),
    properties = propertiesReader('app.properties'),
    crypto = require('crypto'),
    User = require('./models/user'),
    initDbSampleData = require("./initDbSampleData"),
    databaseHost = properties.get("db.host"),
    databaseName = properties.get("db.database"),
    loginMiddleWare = require("./routes/loginUtility");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
// Auth boiler plate start
app.use(expressSession({
    secret: crypto.randomBytes(Math.ceil(15)).toString('hex').slice(0, 15),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(loginMiddleWare.setLoggedInUser);
// Auth boiler plate ends
mongoose.connect(databaseHost + databaseName);
initDbSampleData();
app.use(require("./routes/authRoutes"));
app.use(require("./routes/mainRoutes"));
app.listen(8000, () => console.log("YelpCamp v5.0 has started and listening at 8000"));