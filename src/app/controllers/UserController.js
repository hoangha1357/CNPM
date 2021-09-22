const Dish = require('../models/Dish');
const { mutiMongoosetoObject } = require('../../util/mongoose');

class UserController {
    index(req, res) {
        res.send('asd');
    }
    // [GET] /user/ordered
    // orderd(req, res) {}

    // [GET] /user/viewrevenue
    viewrevenue(req, res, next) {
        Promise.all([Dish.find({}), Dish.countDocumentsDeleted()])
            .then(([dishes, deletedCount]) => {
                res.render('user/viewrevenue', {
                    deletedCount,
                    dishes: mutiMongoosetoObject(dishes),
                });
            })
            .catch(next);
    }

    // [GET] /user/trash
    trash(req, res, next) {
        Dish.findDeleted({})
            .then((dishes) => {
                res.render('user/trash', {
                    dishes: mutiMongoosetoObject(dishes),
                });
            })
            .catch(next);
    }
}

module.exports = new UserController();
