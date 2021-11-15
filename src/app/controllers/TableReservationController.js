const Table = require('../models/Table');
const { mutiMongoosetoObject } = require('../../util/subfuntion');

class TableReservationController {
    search(req, res, next) {
        res.render('tableReservation');
    }
    
}


module.exports = new TableReservationController();
