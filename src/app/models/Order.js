const mongoose = require('mongoose');
const mongoosedelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        userID: {type: String, required: true},
        totalPrice: { type: Number, required: true },
        orders: [
            {type :Object}
        ],
        paymentMethod: {type: String, required: true}

       
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);