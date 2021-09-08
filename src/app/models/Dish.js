const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dish = new Schema({
    name: { type: String, maxlength: 100 },
    type_dish: { type: String },
    recommend: { type: Boolean },
    image: { type: String },
    createAt: {type: Date,default: Date.now},
    updateAt: {type: Date,default: Date.now},
});

module.exports = mongoose.model('Dish', Dish);
