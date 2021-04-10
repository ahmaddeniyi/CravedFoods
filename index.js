const express = require('express'),
    path = require('path'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser');
    favicon = require('serve-favicon'),
    session = require('express-session'),
    passport = require('passport'),
    validator = require('express-validator');
    LocalStrategy = require('passport-local').Strategy,
    passportLocalMongoose = require('passport-local-mongoose'),
    flash = require('connect-flash'),
    app = express(),
    port = 3000;

mongoose.connect('mongodb://localhost/craved_meals');
require('./config');
// Route directories
const routes = require('./routes/index');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const User = require('./models/user');

// View engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "hbs");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
    secret: 'undergrad project 2021', 
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(express.static(__dirname + '/views'));


// PASSPORT CONFIGURATION
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(express.static('public'));

// ==============
// ROUTES
// ==============

app.get("/", (req, res) => {
    res.render("home/index", {title: 'CravedFoods | Home of Premium food delivery'});
});

app.use('/api/', routes);
app.use('/api/menus/', menuRoutes);
app.use('/api/user/', userRoutes),
// app.use('/api/admin', adminRoutes);

// Catch 404 error status and forward to err handlers
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Dev error handler
// Print stacktrace
if (app.get('env') == 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// no stacktraces to be leaked to the user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(port, () => {
    console.log("Process is running at port: " + port);
});

// module.exports = app;