const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/menu'); 

router.route('/')
    .get(helpers.getMenus)
    .post(helpers.createMenu)

router.route('/:menuId')
    .get(helpers.getMenu)
    .put(helpers.updateMenu)
    .delete(helpers.deleteMenu)

module.exports = router;