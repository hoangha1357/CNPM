const Dish      = require('../models/Dish');
const User    = require('../models/Userid');

const { mutiMongoosetoObject,MongoosetoObject }  = require('../../util/subfuntion');

class ManagerController {
    index(req, res) {
        res.send('asd');
    }
    // [GET] /manager/viewrevenue
    viewrevenue(req, res, next) {
        if(!req.query.page) req.query.page = 1;
        // res.json(req.session.email);
        Promise.all([Dish.find({}).limit(6).skip((req.query.page - 1) * 6).sortable(req), Dish.countDocumentsDeleted(),Dish.countDocuments()])
            .then(([dishes, deletedCount, count]) => {
                res.render('user/viewrevenue', {
                    dishes: mutiMongoosetoObject(dishes),
                    page: req.query.page,
                    user: req.user,
                    count,
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /manager/trash
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

module.exports = new ManagerController();
