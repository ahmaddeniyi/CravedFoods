const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    date: {type: String, required:true},
    time: {type: Date, default: Date.now, required: true},
    preparing: {type: Boolean, required:true},
    onTheWay: {type:Boolean, required: true},
    delivered: {type:Boolean, required: true},
    address: {type:String, required: true},
    name: {type:String, required: true},
    paymentId: {type:String, required: true}
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;