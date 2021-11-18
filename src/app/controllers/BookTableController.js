const Table = require('../models/Table');
const Userid = require('../models/Userid');
const { mutiMongoosetoObject, MongoosetoObject } = require('../../util/subfuntion');

class BookTableController {
    booktable(req, res, next) {
        // res.render('Site/book_table');
        Table.findById(req.params.id)
            .then((table) => 
                res.render('Site/book_table', {table: MongoosetoObject(table)})
            )
            .catch(next);
    }
    
    // [GET] /booktable/reservated
    reservated(req, res, next) {
        res.render('Site/book_table_reservated');
    }



    // [POST] /booktable/choosetable
    choosetable(req, res, next) {
        res.render('Site/choosetable');
    }

    thankyou(req, res, next) {
        res.render('Site/thankyou');
    }
}


module.exports = new BookTableController();
