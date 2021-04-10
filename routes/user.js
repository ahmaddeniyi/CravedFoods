const express = require("express");
const router = express.Router();
const passport = require("passport");

const db = require('../models');
const User = require("../models/user");
const Cart = require("../models/cart");

// Show signup logic
router.get("/register", (req, res) => {
  res.render("user/signup");
});

// Handle signup logic
router.post("/register", function (req, res) {
  const username = req.body.username;
  const phoneNo = req.body.phoneNo;
  const state = req.body.state;
  const city = req.body.city;
  const email = req.body.email;

  const newUser = new User({
    username: username,
    phoneNo: phoneNo,
    state: state,
    city: city,
    email: email
  });
  // Create a new user and save to DB
  User.register(newUser, req.body.password, (err, newlyCreated) => {
    if (err) {
      req.flash("error", err.message);
      console.log("Error registering user");
      console.log(err);
      return res.render("user/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to CravedFoods " + newlyCreated.name);
      console.log(newlyCreated);
      // redirect to menu page
      res.redirect("/api/user/profile");
    });
  });
});

// Show login form
router.get('/login', (req, res) => {
    res.render('user/login');
});

// Handle login logic
router.post('/login', passport.authenticate("local",
    {
        successRedirect: "/api/user/profile?loggedIn=1",
        failureRedirect: "/api/user/login"
    }), (req, res) => {
});

// Logout logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect('/api/user/login');
});

// User profile rendering
router.get("/profile", isLoggedIn, (req, res, next) => {
  db.Order.find({
      user: req.user,
      isLogged: typeof req.user === "object" || null,
  }, (err, orders) => {
      if(err) {
          return res.write('Error!');
      }
      var cart;
      orders.forEach((order) => {
          cart = new Cart(order.cart);
          order.items = cart.generateArray();
      });
      res.render('user/profile', {
          orders: orders,
          user: req.user
      });
  });
});

// Updating profile
router.post('/profile', function(req, res, next) {
  if (req.body.email) {
    User.findOne({
      email: req.body.email
    }, function(err, doc) {

      if (err) {
        req.flash('error', 'failed')
        console.log(err);
      }

      doc.email = req.body.email;
      doc.name = req.body.name;
      doc.state = req.body.state;
      doc.city = req.body.city;
      
      doc.save();

    });
  } else {
    console.log("Invalid email!");
  }

  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('api/user/profile');
  }

  res.end();

});

router.delete('/removeUser', (req, res) => {
  
});

module.exports = router;

// Middlewares
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}
