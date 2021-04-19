const express = require("express");
const router = express.Router({mergeParams:true});
const passport = require("passport");
const middleware = require('../middleware');

const User = require("../models/user");
const Order = require("../models/order");
const Feedback = require("../models/feedback");

// Show signup page
router.get("/register", (req, res, next) => {
  res.render("user/signup");
});

// Handle signup logic
router.post("/register", isLoggedIn, function (req, res, next) {
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
      console.log(err);
      req.flash("error", err.message);
      console.log("Error registering user");
      return res.render("user/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to CravedFoods " + newlyCreated.username);
      console.log(newlyCreated);
      // redirect to menu page
      res.redirect("/api/menus/");
    });
  });
});

// Show update profile page
router.get("/profile", middleware.isLoggedIn, (req, res) => {
  res.render("user/editProfile");
});

// Handle update profile logic
router.put("/profile/:userId", middleware.isLoggedIn, (req, res) => {
  User.findByIdAndUpdate({_id: req.params.userId}, req.body.currentUser, {new:true})
  .then((currentUser) => {
    req.flash("success", req.body.currentUser.username + "'s profile updated successfully");
    res.redirect('/api/menus');
  })
  .catch((err) => {
    req.flash("error", err.message);
    res.redirect('/api/menus/' + req.params.userId);
    res.send(err)
  })
});

// Show login form
router.get("/login", isLoggedIn, (req, res) => {
  res.render("user/login");
});

// Handle login logic
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/api/menus/",
    failureRedirect: "/api/user/login"
  }),
  (req, res, next) => {
});

// Logout logic
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/api/user/login");
});

router.get("/add", middleware.checkRole, (req, res) => {
  res.render("admin/create");
});

router.get('/allusers', middleware.checkRole, (req, res) => {
  // Get all users from DB
  User.find()
  .then((allUsers) => {
      console.log(allUsers);
      res.render("user/allusers", {users: allUsers});
  })
  .catch((err) => {
      req.flash("error", err.message);
      console.log(err);
  });
});

router.delete('/:userId', middleware.checkRole, (req, res) => {
  User.findOneAndDelete({_id: req.params.userId})
  .then(() => {
      req.flash("success", "User deleted successfully");
      res.redirect('/api/user/allusers');
  })
  .catch((err) => {
      req.flash("error", err.message);
      res.redirect('/api/user/allusers')
  })
})

// Show all orders from db
router.get("/allorders", (req, res) => {
  // Get all orders from DB
  Order.find()
  .then((allOrders) => {
      // console.log(allOrders);
      res.render('shop/allorders', {orders: allOrders});
      
  })
  .catch((err) => {
      req.flash("error", err.message);
      console.log(err);
  });
});
// Show all orders by a particular customer
router.get('/myorders', middleware.isLoggedIn, (req, res, next) => {
  Order.find({
    user: req.user
  }, function(err, orders) {
    if (err) {
      req.flash("error", err.message);
    }
    res.render('user/myorders', {
      orders: orders
    });
  });
})

// Delete an order with its ID
router.delete('/order/:orderId', middleware.checkRole, (req, res) => {
  Order.findOneAndDelete({_id: req.params.orderId})
  .then(() => {
      req.flash("success", "Order deleted successfully");
      res.redirect('/api/user/allorders');
  })
  .catch((err) => {
      req.flash("error", err.message);
      res.redirect('/api/user/allorders');
  })
});

// ========================
// Feedback Route
// =======================
router.get('/feedback', middleware.isLoggedIn, (re, res) => {
  res.render('user/feedback');
});

router.post('/feedback', (req, res) => {
    // Get data from form and add to feedback collection
    let user = req.user;
    let username = req.user.username;
    let heading = req.body.heading;
    let body = req.body.body;

    let newFeedback = {user: user, username: username, heading: heading, body: body};
    Feedback.create(newFeedback)
    .then((newFeedback) => {
        console.log(newFeedback);
        req.flash("success", "Thanks " + username + ". Your feedback has been received!");
        res.status(201).redirect("/api/menus");
    })
  .catch((err) => {
    req.flash("error", err.message);
    console.log(err);
  })
})

// Get all feedbacks from database
router.get("/allfeedbacks", (req, res) => {
  // Get all feedbacks from DB
  Feedback.find()
  .then((allFeedbacks) => {
      console.log(allFeedbacks);
      res.render('user/allfeedbacks', {feedbacks: allFeedbacks});
      
  })
  .catch((err) => {
      req.flash("error", err.message);
      console.log(err);
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in");
    res.redirect("/api/user/login");
  } else {
    next();
  }
}