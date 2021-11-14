const Dish = require('../models/Dish');
const { mutiMongoosetoObject } = require('../../util/subfuntion');

class SiteController {
    home(req, res, next) {
        Dish.find({ recommend: true })
            .then((dishes) => {
                res.render('home1', {
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user, 
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('home1');
    }

    loginpage(req, res, next) {
        res.render('loginpage');
    }

    register(req, res) {
        res.render('register');
    }

    booktable(req, res) {
        res.render('book_table',{user: req.user});
    }
}


module.exports = new SiteController();
