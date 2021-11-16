const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema(
    {
        email: { type: String},
        name: { type: String, maxlength: 100},
        address: { type: String },
        numofguests: { type: Number},
        time: { type: String},
        date: { type: String},
        tableID: { type: Number},
    },
    { 
        timestamps: true,
    },
);


module.exports = mongoose.model('Table', Table);
