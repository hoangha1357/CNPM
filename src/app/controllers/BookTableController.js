const Table = require('../models/Table');
const Userid = require('../models/Userid');
const { mutiMongoosetoObject, MongoosetoObject } = require('../../util/subfuntion');

class BookTableController {
    booktable(req, res, next) {
        // res.render('Site/book_table');
        Table.findById(req.params.id)
            .then((table) => 
                res.render('Site/book_table', {
                    table: MongoosetoObject(table),
                    user: req.user,
                })
            )
            .catch(next);
    }
    
    // [GET] /booktable/reservated
    reservated(req, res, next) {
        res.render('Site/book_table_reservated');
    }

    

    // [POST] /booktable/choosetable
    choosetable(req, res, next) {
        const table = new Table({
          email: req.user.email,  
          name: req.user.name,
          numofguests: req.body.numofguests,
          time: req.body.time,
          date: req.body.date
        });
        table.save()
          .then(() => res.render('Site/choosetable'))
          .catch(error => {
            
          });
    }

    thankyou(req, res, next) {
        res.render('Site/book_table_thankyou')
    }
}


module.exports = new BookTableController();
