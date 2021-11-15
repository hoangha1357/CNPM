const Table = require('../models/Table');
const { mutiMongoosetoObject } = require('../../util/subfuntion');

class BooktableController {
    booktable(req, res, next) {
        res.render('Site/book_table');
    }
    // [POST]    /booktable/thankyou
    booktable_thankyou(req,res,next) {
        const table = new Table(req.body);

        table.save()
            .then(() => res.redirect('/booktable/thankyou'))
            .catch((error) => {
                res.json(error);
            });
    }
}

module.exports = new BooktableController();
