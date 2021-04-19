const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required: true},
    menuOrdered: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    time: {type: Date, default: new Date()},
    quantity: {type: Number, required: true},
    district: {type: String, required: true},
    preparing: {type: Boolean, default: true},
    onTheWay: {type:Boolean, default: false},
    delivered: {type:Boolean, default: false},
    address: {type:String, required: true},
    paymentId: {type:String, default: "PAID"}
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;