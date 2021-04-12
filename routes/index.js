const express = require('express');
const router = express.Router();
const db = require('../models');
// const Cart = require('../models/cart');

router.use("/public", express.static('public'));

router.get('/', (req, res) => {
  res.render('shop/index');
})

router.get('/shopping-cart', (req, res) => {
    res.render('shop/shopping-cart');
})

router.get('/add-to-cart/:id', function(req, res, next) {
    var menuId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    db.Menu.findById(menuId, function(err, foundMenu) {
      if (err) {
        return res.redirect('/');
      }
      cart.add(foundMenu, foundMenu.id);
      req.session.cart = cart;
      res.redirect('/');
    });
});

router.get('/about', (req, res) => {
    res.render("home/about");
});

router.get('/cities', (req, res) => {
    res.render("home/cities");
});

router.get('/howitworks', (req, res) => {
  res.render("home/howitworks");
});

module.exports = router;