const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dish = new Schema(
    {
        name: { type: String, maxlength: 100, required: true },
        price: { type: Number, required: true },
        type_dish: { type: String, required: true },
        recommend: { type: Boolean, default: false },
        image: { type: String, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Dish', Dish);
