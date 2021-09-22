const methodOverride = require('method-override');
const mongoose = require('mongoose');
const mongoosedelete = require('mongoose-delete');
const { all } = require('../../routes/menu');
const Schema = mongoose.Schema;

const Dish = new Schema(
    {
        name: { type: String, maxlength: 100, required: true },
        price: { type: Number, required: true },
        type_dish: { type: String, required: true },
        recommend: { type: Boolean, default: false },
        image: { type: String, required: true },
        sale: { type: Number, min: 0, default: 0 },
    },
    { timestamps: true },
);

//add plug in
// mongoose.plugin(slug);
Dish.plugin(mongoosedelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Dish', Dish);
