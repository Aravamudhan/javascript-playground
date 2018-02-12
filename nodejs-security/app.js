let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('client-sessions'),
    csrf = require('csurf'),
    bcrypt = require('bcryptjs'),
    User = require('./models');
// ----- authentication middleware -----
function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({
            email: req.session.user.email
        }, 'firstName lastName email data', function (err, user) {
            if (user) {
                createUserSession(req, res, user);
            }
            next();
        });
    } else {
        next();
    }
};
// ----------------------------------------
// ----- Creating user session ------------
function createUserSession(req, res, user) {
    var cleanUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        data: user.data || {},
    };

    req.session.user = cleanUser;
    req.user = cleanUser;
    res.locals.user = cleanUser;
};
// ----------------------------------------
// ---------Requiring login----------------
function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
};
// -------------------------------------
app = express();
mongoose.connect('mongodb://localhost/authdemo');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
// Registering the middleware bodyParser
// It gets run before any of route related functions
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    cookieName: 'session',
    secret: 'keyboard cat',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
// Enables csrf protection
app.use(csrf());
// This middleware checks the requests 
app.use(authMiddleware);
// ---------------The auth routes----------
// Render the registeration page
app.get('/register', (req, res) => {
    res.render('register', {
        csrfToken: req.csrfToken()
    });
});
// After a user enters their details and press register, their details
// are validated and the dashboard is rendered
app.post('/register', (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let userReq = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    };
    User.create(userReq, (err, user) => {
        if (err) {
            let error = 'Something bad happend! Please try again.';
            if (err.code === 11000) {
                // This is the error code from mongo for duplicate entry
                error = 'The email is already take. Please use another';
            }
            res.render('register', {
                error
            });
        } else {
            createUserSession(req, res, user);
            res.redirect('/dashboard');
        }
    });

});
// Render the login page
app.get('/login', (req, res) => {
    res.render('login', {
        csrfToken: req.csrfToken()
    });
});
// Log user into their account
app.post('/login', (req, res) => {
    let csrfToken = req.csrfToken();
    User.findOne({
        email: req.body.email
    }, 'firstName lastName email password data', (err, user) => {
        let error = 'Something bad happend! Please try again.';
        if (err) {
            res.render('register', {
                error,
                csrfToken
            });
        }
        if (!user) {
            error = 'User is not found. Incorrect email';
            res.render('login', {
                error,
                csrfToken
            });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            createUserSession(req, res, user);
            res.redirect('/dashboard');
        } else {
            error = 'Incorrect email / password.';
            res.render('login', {
                error,
                csrfToken
            });
        }
    });

});
app.get('/logout', function (req, res) {
    if (req.session) {
        req.session.reset();
    }
    res.redirect('/');
});
// ----------------------------------------
// ------------The main routes-------------
// Render the home page
app.get('/', (req, res) => {
    res.render('index');
});
// Render the dashboard
app.get('/dashboard', requireLogin, (req, res) => {
    res.render('dashboard');
});
// ---------------------------------------
app.listen(8000, () => console.log("App started and listening at 8000"));