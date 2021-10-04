const Dish      = require('../models/Dish');
const Userid    = require('../models/Userid');
const bcryt     = require('bcrypt');
const jwt       = require('jsonwebtoken');
const { mutiMongoosetoObject,MongoosetoObject }  = require('../../util/mongoose');

class UserController {
    index(req, res) {
        res.send('asd');
    }
    // [GET] /user/ordered
    // orderd(req, res) {}

    // [GET] /user/viewrevenue
    viewrevenue(req, res, next) {
        // res.json(res.locals._sort)

        Promise.all([Dish.find({}).sortable(req), Dish.countDocumentsDeleted()])
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

    // [POST] /user/register
    register(req, res, next) {
        bcryt.hash(req.body.password,10,function(err,hashedPass) {
            if(err) return res.json(err);
            req.body.password = hashedPass;
            const user = new Userid(req.body);  
            user.save()
                .then(() => res.redirect('/loginpage'))
                .catch((error) => {
                    res.json(error);
                });
        })
    }

    // [POST] /user/login
    login(req, res, next) {
        Userid.findOne({email: req.body.email})
            .then((userid)=>{
                if(!userid) return res.json({massage: "no user found"});
                const email = userid.name;
                bcryt.compare(req.body.password,userid.password)
                    .then((result) => {
                        if(!result) return res.json({massage: "wrong pass word"});
                        const token = jwt.sign({name: email},"asdasd" ,{expiresIn:'2h'});
                        // res.json({token: token});
                        req.session.userId = userid._id;
                        res.redirect('/user/viewrevenue');
                    })
                    .catch((error) =>{
                        res.send({massage: error});
                    });
            })
            .catch(next);
    }
    // [GET] /user/logout
    logout(req, res, next) {
        if (req.session) {
          // delete session object
          req.session.destroy(function(err) {
            if(err) {
              return next(err);
            } else {
              return res.redirect('/');
            }
          });
        }
    }
}

module.exports = new UserController();
