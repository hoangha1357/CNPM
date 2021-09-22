const Dish = require('../models/Dish');
const { mutiMongoosetoObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {
        Dish.find({ recommend: true })
            .then((dishes) => {
                res.render('home', { dishes: mutiMongoosetoObject(dishes) });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }

    register(req, res) {
        res.render('register');
    }

    booktable(req, res) {
        res.render('book_table');
    }
}

module.exports = new SiteController();
