const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema(
    {
        email: { type: String ,unique: true},
        permission: { type: String, default: 'Customer' },
        name: { type: String, maxlength: 100 ,required: true},
        address: { type: String },
        tableID: {type:Number},
        numofguests: { type: Number},
        time: { type: String},
        bookAt: {type: Date}
    },
    { 
        timestamps: true,
    },
);


module.exports = mongoose.model('Table', Table);
