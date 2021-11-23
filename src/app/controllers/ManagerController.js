const Dish      =  require('../models/Dish');
const Table     =  require('../models/Table');
const User      =  require('../models/Userid');
const Order = require('../models/Order');

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

    // [GET] /manager/vieworders
    viewOrders(req, res, next) {
        //if(!req.query.page) req.query.page = 1;
        // res.json(req.session.email);
        Order.find({})
            .then((orders) => {
                res.render('user/ordered',{
                    user: req.user,
                    orders: mutiMongoosetoObject(orders)
                })
            })
            .catch(next)
    }

    // [GET] /manager/trash
    trash(req, res, next) {
        Dish.findDeleted({})
            .then((dishes) => {
                res.render('user/trash', {
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user,
                });
            })
            .catch(next);
    }
    
    create(req, res, next) {
        res.render('Menusub/create',{user: req.user,});
    }

    edit(req, res, next) {
        Dish.findById(req.params.id)
            .then((dish) =>
                res.render('Menusub/edit', {
                    dish: MongoosetoObject(dish),
                    user: req.user,
                }),
            )
            .catch(next);
    }
    viewtablereservation(req, res, next) {
        // if(!req.query.page) req.query.page = 1;
        // // res.json(req.session.email);
        // Promise.all([Table.find({}).limit(6).skip((req.query.page - 1) * 6).sortable(req), Table.countDocumentsDeleted(),Table.countDocuments()])
        //     .then(([tables, deletedCount, count]) => {
        //         res.render('user/viewtablereservation', {
        //             tables: mutiMongoosetoObject(tables),
        //             user: req.user,
        //         });
        //     })
        //     .catch(next);
    }
}

module.exports = new ManagerController();
