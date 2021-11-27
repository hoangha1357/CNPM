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
        var tablelist = {
            table1: dinner,
            table2: dinner,
            table3: dinner,
            table4: dinner,
            table5: dinner,
            table6: dinner,
            table7: dinner,
            table8: dinner,
            table9: dinner,
        }
        // console.log(dinner);
        const newtable = new Table({
            time: req.body.time,
            date: req.body.date,
        });

        Table.find({ date: req.body.date}, function(err,tables){
            if(err) return res.json(err);
            for(var table of tables){
                switch(table.tableID){
                    case '1': 
                        //console.log(table)
                        tablelist.table1 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '2': 
                        //console.log(table)
                        tablelist.table2 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '3': 
                        //console.log(table)
                        tablelist.table3 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '4': 
                        //console.log(table)
                        tablelist.table4 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '5': 
                        //console.log(table)
                        tablelist.table5 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '6': 
                        //console.log(table)
                        tablelist.table6 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '7': 
                        //console.log(table)
                        tablelist.table7 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '8': 
                        //console.log(table)
                        tablelist.table8 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                    case '9': 
                        //console.log(table)
                        tablelist.table9 = dinner_disable
                        // console.log(tablelist.table1)
                        break;
                }
            }
        }) 
        res.render('Site/choosetable', {
            newtable: MongoosetoObject(newtable),
            tablelist,
            user: req.user,
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
                user: req.user,
            }))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
              Table.delete({ _id: {  $in: req.body.courseIds } })
                .then(() => res.redirect('back'))
                .catch(next);
              break;
            default:
              res.json( {message: 'Invalid action'} );
          }
    }

    // [POST] /courses/handle-form-actions-2
    handleFormActions2(req, res, next) {
            switch(req.body.action) {
                case 'restore':
                    Table.restore({ _id: {  $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                    break;
                // -----------------------------------------------------
                case 'delete-force':
                    Table.deleteMany({ _id: {  $in: req.body.courseIds } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                    break;
                // -----------------------------------------------------
                default:
                    res.json( {message: 'Invalid action'} );
        }
    }
}

module.exports = new BookTableController();
