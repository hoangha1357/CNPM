const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema(
    {
        email: { type: String},
        permission: { type: String, default: 'Customer' },
        name: { type: String, maxlength: 100},
        address: { type: String},
        tableID: {type: Number},
        time: {type: String},
        numofguests: {type: Number},
        date: {type: Date}
    },
    { 
        timestamps: true,
    },
);


module.exports = mongoose.model('Table', Table);
