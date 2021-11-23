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
            //email: req.user.email,  
           // name: req.user.name,
            time: req.body.time,
            date: req.body.date,
            image: dinner,
        });
        Table.find({ date: req.body.date}, function(err,tables){
            //res.json(tables);
            if(err) return res.json(err);
            for(var table of tables){
                //console.log(table.tableID);
                table = table.toObject();
                //res.json(table);
                // if(table.tableID === 1) tablelist.table1 = dinner_disable;
                switch(table.tableID){
                    case '1': 
                        //console.log(table)
                        tablelist.table1 = dinner_disable
                        console.log(tablelist.table1)
                        break;
                    case 2: tablelist.table2 = dinner_disable
                        break;
                    case 3: tablelist.table3 = dinner_disable
                        break;
                    case 4: tablelist.table4 = dinner_disable
                        break;
                    case 5: tablelist.table5 = dinner_disable
                        break;
                    case 6: tablelist.table6 = dinner_disable
                        break;
                    case 7: tablelist.table7 = dinner_disable
                        break;
                    case 8: tablelist.table8 = dinner_disable
                        break;
                    case 9: tablelist.table9 = dinner_disable
                        break;   
                }
                console.log(tablelist)
                res.render('Site/choosetable', {
                    newtable: MongoosetoObject(newtable),
                    tablelist
                })
            }
            
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
