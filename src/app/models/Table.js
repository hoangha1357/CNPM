const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Table = new Schema(
    {
        email: { type: String, required: true},
        name: { type: String, maxlength: 100, required: true},
        time: { type: String, required: true, default: ''},
        date: { type: String, required: true, default: ''},
        tableID: { type: String, default: '', required: true},
        reservated: {type: Number, default: 0, required: true},
        image: {type: String,}
    },
    { 
        timestamps: true,
    },
);

Table.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
  });


module.exports = mongoose.model('Table', Table);