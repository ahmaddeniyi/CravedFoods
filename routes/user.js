const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");
// const Cart = require("../models/cart");
// const Menus = require("../helpers/menu");

// Show signup logic
router.get("/register", (req, res, next) => {
  res.render("user/signup");
});

// Handle signup logic
router.post("/register", function (req, res, next) {
  const username = req.body.username;
  const phoneNo = req.body.phoneNo;
  const state = req.body.state;
  const city = req.body.city;
  const email = req.body.email;

  const newUser = new User({username: username, phoneNo: phoneNo, state: state, city: city,
    email: email});
  // Create a new user and save to DB
  User.register(newUser, req.body.password, (err, newlyCreated) => {
    if (err) {
      req.flash("error", err.message);
      console.log("Error registering user");
      return res.render("user/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to CravedFoods " + newlyCreated.name);
      console.log(newlyCreated);
      // redirect to menu page
      res.redirect("/api/menus/");
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
        successRedirect: "/api/menus/",
        failureRedirect: "/api/user/login"
    }), (req, res, next) => {
});

// Logout logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect('/api/user/login');
});


module.exports = router;                                                    
