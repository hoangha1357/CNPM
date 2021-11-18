const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema(
    {
        email: { type: String},
        name: { type: String, maxlength: 100},
        numofguests: { type: Number},
        time: { type: String},
        date: { type: String},
        tableID: { type: String, default: ''},
        reservated: {type: Number, default: 0},
    },
    { 
        timestamps: true,
    },
);


module.exports = mongoose.model('Table', Table);
