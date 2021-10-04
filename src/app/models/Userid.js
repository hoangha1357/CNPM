const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userid = new Schema(
    {
        email: { type: String },
        password: { type: String, required: true },
        permission: { type: String, default: 'Customer' },
        name: { type: String, maxlength: 100 ,required: true},
        gender: { type: String, required: true },
        address: { type: String },
    },
    { timestamps: true },
);


module.exports = mongoose.model('Userid', Userid);
