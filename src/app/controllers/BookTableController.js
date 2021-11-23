const Table = require('../models/Table');
const Userid = require('../models/Userid');
const Cart =    require('../models/Cart');
const { mutiMongoosetoObject, MongoosetoObject } = require('../../util/subfuntion');

class BookTableController {
    booktable(req, res, next) {
        // res.render('Site/book_table');
        var cart = new Cart(req.session.cart);
        Table.findById(req.params.id)
            .then((table) => 
                res.render('Site/book_table', {
                    cartdishes: req.session.cart ? cart.generateArray() : null ,
                    totalPrice: req.session.cart ? cart.totalPrice : 0,
                    totalQty: req.session.cart ? cart.totalQty : 0,
                    table: MongoosetoObject(table),
                    user: req.user,
                    message: 'Vui lòng điền đầy đủ thông tin'
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
        var dinner = "http://localhost:3000/image/dinner.png";
        var dinner_disable = "http://localhost:3000/image/dinner_disable.png"
        // console.log(dinner);
        const newtable = new Table({
            email: req.user.email,  
            name: req.user.name,
            time: req.body.time,
            date: req.body.date,
            image: dinner,
        });
        Table.find({ date: req.body.date})
            .then((tables) => 
                tables.image = dinner_disable,
            )
            .catch(next);

        res.render('Site/choosetable', {
            newtable: MongoosetoObject(newtable),
        })
    }

    thankyou(req, res, next) {
        const newtable = new Table({
            email: req.user.email,  
            name: req.user.name,
            time: req.body.time,
            date: req.body.date,
            tableID: req.body.tableID,
            reservated: 1
          });
        newtable.save() 
            .then(() => res.render('Site/book_table_thankyou', {
                newtable: MongoosetoObject(newtable),
            }))
            .catch(next);
    }
}


module.exports = new BookTableController();
