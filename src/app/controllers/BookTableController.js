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

    // [POST] /booktable/thankyou
    thankyou(req, res, next) {
        const formData = req.body;
        const table = new Table(formData);
        table.save()
          .then(() => res.render('Site/book_table_thankyou'))
          .catch(error => {
            
          });
        // res.json(req.body);
    }
}


module.exports = new BookTableController();
