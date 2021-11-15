const Table = require('../models/Table');
const { mutiMongoosetoObject } = require('../../util/mongoose');

class TableReservationController {
    search(req, res, next) {
        res.render('tableReservation');
    }
    
}


module.exports = new TableReservationController();
