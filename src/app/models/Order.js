const mongoose = require('mongoose');
const mongoosedelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        userID: {type: String, required: true},
        userName: {type: String, required: true},
        userAddress: {type: String, required: true},
        totalPrice: { type: Number, required: true },
        totalQty: {type: Number, required: true},
        orders: [
            {type :Object}
        ],
        paymentMethod: {type: String, required: true},
        status: {type: String, default:'Incomplete', required: true},
        paymentStatus: {type: String, required: true}

       
    },
    { timestamps: true },
);

// Order.query.sortable = function () {
//     return this.sort({[createdAt]: desc,});
// };
module.exports = mongoose.model('Order', Order);