const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, unique: true },
        image: { type: Buffer },
        imageType: { type: String },
        imageName: { type: String},
        password: { type: String, required:true },
        permission: { type: String, default: 'Customer' },
        name: { type: String, maxlength: 100, required: true },
        address: { type: String },
        paymentInfo: {
            name: {type: String},
            number: {type: String},
            month: {type: Number },
            year: {type: Number},
            CVC: {type: Number},
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);

