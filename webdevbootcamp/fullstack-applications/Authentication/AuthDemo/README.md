## Authentication using passportjs
* Install passport, express-session, passport-local-mongoose, passport-local
* Setup the express-session which takes care of decoding and encoding the session
```
    app.use(expressSession({
        secret: "This is the SECRET WORD",
        resave: false,
        saveUninitialized: false
    }));
```
* Create the user schema and add the plugin passportLocalMongoose
```
    const userSchema = new mongoose.Schema({
        username: String,
        password: String
    });
    userSchema.plugin(passportLocalMongoose);
```
* The passport middlewares
```
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
```
* To register/signup/create a new 'User'
```
    User.register(new User({
        username
    }), password, function (err, user) {
        if (err) {
            console.log(err);
            // render the error message to the UI
            res.render("register", {
                error: err.message
            });
        } else {
            passport.authenticate("local")(req, res, function () {
                let userDetail = {};
                userDetail.username = user.username;
                // Successfully created the user, now render the 
                res.render("dashboard", {
                    userDetail
                });
            });
        }
    });
```