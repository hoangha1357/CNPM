const methodOverride = require('method-override');
const mongoose = require('mongoose');
const mongoosedelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Dish = new Schema(
    {
        name: { type: String, maxlength: 100, required: true },
        price: { type: Number, required: true },
        type_dish: { type: String, required: true },
        recommend: { type: Boolean, default: false },
        image: { type: Buffer, required: true },
        imageType: { type: String, required: true },
        sale: { type: Number, min: 0, default: 0 },
    },
    { timestamps: true },
);

//custom query helpers
Dish.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        return this.sort({
            [req.query.column]: req.query.type,
        });
    }
    return this;
};

//add plug in

Dish.plugin(mongoosedelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Dish', Dish);
