const Dish = require('../models/Dish');
const Table = require('../models/Table');
const { mutiMongoosetoObject } = require('../../util/subfuntion');

class SiteController {
    home(req, res, next) {
        Dish.find({ recommend: true })
            .then((dishes) => {
                res.render('Site/home', {
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user,
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('Site/home1', { user: req.user });
    }

    loginpage(req, res, next) {
        res.render('Site/loginpage');
    }

    register(req, res) {
        res.render('Site/register');
    }

    booktable(req, res, next) {
        res.render('Site/book_table');
    }
    // [POST]    /booktable/thankyou
    booktable_thankyou(req,res,next) {
        const formData = req.body;
        const table = new Table(formData);
        table.save()
            .then(() => res.redirect('/booktable/thankyou'))
            .catch(error => {})
    }
}

module.exports = new SiteController();
