const Table = require('../models/Table');
const { mutiMongoosetoObject } = require('../../util/subfuntion');

class BookTableController {
    booktable(req, res, next) {
        res.render('Site/book_table');
    }
    // [POST] /booktable/thankyou
  store(req, res, next) {
      const formData = req.body;
      const table = new Table(formData);
      course.save()
        .then(() => res.redirect('/booktable'))
        .catch(error => {

        });
  }
}


module.exports = new BookTableController();
