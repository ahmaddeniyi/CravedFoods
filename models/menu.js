const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: 'Description must be provided'},
    price: {type: Number, default: 0},
    category: {type: String, required: false, default: 'Best Seller'}
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;