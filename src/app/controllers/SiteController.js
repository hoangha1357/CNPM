const Dish = require('../models/Dish');
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

    booktable(req, res) {
        res.render('Site/book_table', { user: req.user });
    }
}

module.exports = new SiteController();
