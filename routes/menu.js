const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/menu'); 

router.use("/public", express.static('public'));

router.route('/')
    .get(helpers.getMenus)
    .post(isLoggedIn, helpers.createMenu)

router.route('/:menuId')
    .get(helpers.getMenu)
    .put(helpers.updateMenu)
    .delete(helpers.deleteMenu)

router.get('/:menuId/edit', (req, res) => {
    db.Menu.findById(req.params.menuId, (err, foundMenu) => {
        res.render('admin/editMenu', {menu: foundMenu});
    });
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