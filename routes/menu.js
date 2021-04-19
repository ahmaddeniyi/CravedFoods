const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models");
const helpers = require("../helpers/menu");
const middleware = require("../middleware");

router.use("/public", express.static("public"));

router
  .route("/")
  .get(helpers.getMenus)
  .post(middleware.checkRole, helpers.createMenu);

router
  .route("/:menuId")
  .get(middleware.isLoggedIn, helpers.getMenu)
  .put(middleware.checkRole, helpers.updateMenu)
  .delete(middleware.checkRole, helpers.deleteMenu);

router.get("/:menuId/edit", middleware.checkRole, (req, res) => {
  db.Menu.findById(req.params.menuId, (err, foundMenu) => {
    res.render("admin/editMenu", { menu: foundMenu });
  });
});

// ==================
// Order Routes
// ==================

router.route("/:menuId/placeorder")
     .get(middleware.isLoggedIn, helpers.getOrderPage)
     .post(middleware.isLoggedIn, helpers.orderMenu)

module.exports = router;
