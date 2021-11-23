const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


module.exports = mongoose.model('Table', Table);


// Table.findOne({ date: req.body.date })
//      .then((table) =>{ 
//          newtable.image = table ? dinner_disable : dinner ;
//         })
//      .catch(next);