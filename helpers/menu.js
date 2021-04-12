const db = require('../models');

// Show all Menus
exports.getMenus = (req, res) => {
    // Get all menus from DB
    db.Menu.find({}, (err, allMenus) => {
        if(err) {
          console.log(err);
        } else {
            console.log(allMenus);
            res.render("shop/menus", {menus: allMenus});
        }
    });
};

// Create new Menu
exports.createMenu = (req, res) => {
    // Get data from form and add to menu array
    var name = 
    db.Menu.create(req.body)
    .then((newMenu) =>{
        res.status(201).json(newMenu)
    }) 
    .catch((err) => {
        res.send(err)
    })
}

// Find a particular menu
exports.getMenu = (req, res) => {
    const menuId = req.params.menuId;
    db.Menu.findById(menuId)
    .then((foundMenu) => {
        res.json(foundMenu);
    })
    .catch((err) => {
        res.send(err);
    })
}

// update the details of a menu
exports.updateMenu = (req, res) => {
    db.Menu.findByIdAndUpdate({_id: req.params.menuId}, req.body, {new:true})
    .then((menu) => {
        res.json(menu)
    })
    .catch((err) => {
        res.send(err)
    })
}

exports.deleteMenu = (req, res) => {
    db.Menu.findOneAndDelete({_id: req.params.menuId})
    .then(() => {
        res.json({message: "We deleted the menu"})
    })
    .catch((err) => {
        res.send(err);
    })
}

module.exports = exports;   