const express = require('express');
const router = express.Router();

const db = require('../models');
// Show all Menus
exports.getMenus = (req, res) => {
    // Get all menus from DB
    db.Menu.find()
    .then((allMenus) => {
        console.log(allMenus);
        res.render("shop/menus", {menus: allMenus});
    })
    .catch((err) => {
        req.flash("error", err.message);
        console.log(err);
    });
};

// Create new Menu
exports.createMenu = (req, res) => {
    // Get data from form and add to menu array
    let title = req.body.title;
    let image = req.body.imagePath;
    let desc = req.body.description;
    let price = req.body.price;
    let category = req.body.category;
    
    let newMenu = {title: title, imagePath: image, description: desc, price: price, category: category};
    db.Menu.create(newMenu)
    .then((newMenu) =>{
        console.log(newMenu);
        req.flash("success", "Menu {" + newMenu.title + "} created successfully");
        res.status(201).redirect('/api/menus')
    }) 
    .catch((err) => {
        req.flash("error", err.message);
        console.log(err);
    })
}

// Show details of menu using its ID
exports.getMenu = (req, res) => {
    const menuId = req.params.menuId;
    db.Menu.findById(menuId)
    .then((foundMenu) => {
        console.log(foundMenu)
        //render show template with that campground
        res.render("shop/show", {menu: foundMenu});
    })
    .catch((err) => {
        req.flash("error", err.message);
        console.log(err);
    });
}

// update the details of a menu
exports.updateMenu = (req, res) => {
    db.Menu.findByIdAndUpdate({_id: req.params.menuId}, req.body.menu, {new:true})
    .then((menu) => {
        req.flash("success", "Menu {" + req.body.menu.title + "} updated successfully");
        res.redirect('/api/menus');
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect('/api/menus/' + req.params.menuId);
        res.send(err)
    })
}

exports.deleteMenu = (req, res) => {
    db.Menu.findOneAndDelete({_id: req.params.menuId})
    .then(() => {
        req.flash("success", "Menu deleted successfully");
        res.redirect('/api/menus');
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect('/api/menus');
    })
}

// ====================
// Orders Routes
// ====================
exports.getOrderPage = (req, res, next) => {
    const menuId = req.params.menuId;
    db.Menu.findById(menuId)
    .then((foundMenu) => {
        console.log(foundMenu)
        //render order template
        res.render("shop/order", {menu: foundMenu});
    })
    .catch((err) => {
        req.flash("error", err.message);
        console.log(err);
    });
}

exports.orderMenu = (req, res, next) => {
    let user = req.user;
    let username = req.user.username;
    let paymentId = req.body.paymentId;
    let menuOrdered = req.body.title;
    let quantity = req.body.quantity;
    let totalPrice = req.body.price * req.body.quantity;
    let address = req.body.address;
    let district = req.body.district;

    let newOrder = {user: user, username: username, paymentId: paymentId, menuOrdered: menuOrdered, quantity: quantity, totalPrice: totalPrice, address: address, district: district};
    db.Order.create(newOrder)
    .then((newOrder) => {
        console.log(newOrder);
        req.flash("success", "Your " +  quantity + " plates of " + menuOrdered + " will be delivered shortly!");
        res.status(201).redirect("/api/menus");
    })
  .catch((err) => {
    req.flash("error", err.message);
    console.log(err);
  });
}


module.exports = exports;   