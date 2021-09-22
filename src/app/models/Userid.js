const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userid = new Schema(
    {
        username: { type: String, maxlength: 20, required: true, unique: true },
        password: { type: Number, required: true },
        email: { type: String },
        permission: { type: String, default: 'Customer' },
        name: { type: String, maxlength: 255 },
        sex: { type: String, required: true },
        address: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Userid', Userid);
