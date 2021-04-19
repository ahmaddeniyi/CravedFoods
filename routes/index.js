const express = require('express');
const router = express.Router();
const db = require('../models');
const middleware = require("../middleware");
// const Cart = require('../models/cart');

router.get('/', (req, res) => {
  res.render('shop/index');
})

// ==================
// Home Routes
// ==================

router.get('/about', (req, res) => {
  res.render("home/about");
});

router.get('/cities', (req, res) => {
  res.render("home/cities");
});

router.get('/howitworks', (req, res) => {
  res.render("home/howitworks");
});

router.get("/account", middleware.isLoggedIn, (req, res) => {
  res.render("home/accountInfo");
});


module.exports = router;