const Table = require('../models/Table');
const Userid = require('../models/Userid');
const Cart = require('../models/Cart');

const { mutiMongoosetoObject, MongoosetoObject } = require('../../util/subfuntion');

class BookTableController {

    booktable(req, res, next) {
        // res.render('Site/book_table');
        Table.findById(req.params.id)
            .then((table) => {
                if(req.session.cart){ 
                    var cart = new Cart(req.session.cart);
                    res.render('Site/book_table', {
                        table: MongoosetoObject(table),
                        user: req.user, 
                        cartdishes: cart.generateArray(),
                        totalPrice: cart.totalPrice,
                        totalQty: cart.totalQty,
                    });
                }else{
                    res.render('Site/book_table', {
                        table: MongoosetoObject(table),
                        user: req.user,
                    })
                }
            }
                
            )
            .catch(next);
    }
    
    // [GET] /booktable/reservated
    reservated(req, res, next) {
        res.render('Site/book_table_reservated');
    }

    

    // [POST] /booktable/choosetable
    choosetable(req, res, next) {
        const newtable = new Table({
          email: req.user.email,  
          name: req.user.name,
          numofguests: req.body.numofguests,
          time: req.body.time,
          date: req.body.date
        });
        res.render('Site/choosetable',{table: MongoosetoObject(newtable)});
        // res.json(newtable);
        // newtable.save()
        //   .then(() => res.render('Site/choosetable',{table: newtable}))
        //   .catch(error => {
            
        //   });
    }

    thankyou(req, res, next) {
        res.render('Site/book_table_thankyou')
    }
}


module.exports = new BookTableController();
