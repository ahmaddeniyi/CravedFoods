const express = require("express");
const router = express.Router();
const passport = require("passport");

const AdminUser = require("../models/user");
const Cart = require("../models/cart");

// Show login form
router.get('/login', (req, res) => {
    res.render('user/adminlogin');
});

// Handle login logic
router.post('/login', passport.authenticate("local",
    {
        successRedirect: "/api/dashboard",
        failureRedirect: "/api/admin/login"
    }), (req, res, next) => {
});

router.get('/dashboard', )

module.exports = router;