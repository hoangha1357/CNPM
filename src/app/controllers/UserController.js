const Dish = require('../models/Dish');
const User = require('../models/Userid');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mutiMongoosetoObject, MongoosetoObject,  modifyRequestImage} = require('../../util/subfuntion');

class UserController {
    index(req, res) {
        res.render('user/userinfo',{
            user: req.user,
        });
    }
    // [GET] /user/ordered
    ordered(req, res, next) {
        res.render('user/cart',{user: req.user})
    }

    // [GET] /user/ordered
    payment(req, res, next) {
        res.render('user/onlPayment',{user: req.user})
    }

    // [POST] /user/updateImage
    updateImage(req, res, next) {
        // res.json(req.body);
        if(req.body.image) {
            // res.json(req.body);
            modifyRequestImage(req);
            User.updateOne({_id: req.params.id },{$set:{image: req.body.image, imageType: req.body.imageType}})
                .then(() => res.redirect('back'))
                .catch(next);
        }
        if (req.body.name){
            User.updateOne({ _id: req.params.id },{ $set: { name: req.body.name, address: req.body.address } })
                .then(() => res.redirect('back'))
                .catch(next);
        }
    }

    // [POST] /user/register
    register(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    res.render('Site/register', {
                        resinfo: req.body,
                        message: 'User existed',
                    });
                } 
                else if (req.body.password != req.body.cfpassword) {
                    res.render('Site/register', {
                        resinfo: req.body,
                        message: 'Password not match',
                    });
                } else {
                    bcryt.hash(req.body.password,10,function (err, hashedPass) {
                            if (err) return res.json(err);
                            let newuser = new User({
                                email: req.body.email,
                                password: hashedPass,
                                name: req.body.name,
                                gender: req.body.gender,
                                address: req.body.address,
                            });
                            newuser
                                .save()
                                .then(() => res.redirect('/loginpage'))
                                .catch((error) => {
                                    res.json({ message: error });
                                });
                        },
                    );
                }
            })
            .catch((error) => res.json({ message: error.message }));
    }

    // [POST] /user/login
    login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user)
                    return res.render('site/loginpage', {
                        message: 'Wrong user or password',
                    });
                const email = user.email;
                bcryt.compare(req.body.password, user.password)
                    .then((result) => {
                        if (!result)
                            return res.render('site/loginpage', {
                                message: 'Wrong user or password',
                                name: req.body.email,
                            });
                        const token = jwt.sign({ username: email },process.env.ACCESS_TOKEN_SECRET,);
                        req.headers.authorization = 'Bearer ' + token;
                        next();
                    })
                    .catch((error) => {
                        res.send({ message: error });
                    });
            })
            .catch(next);
    }
    // [GET] /user/logout
    logout(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    }

    // [GET] /user/resetpassword/:id/:token
    resetPassword(req, res, next) {
        const {id, token} = req.params
        User.findOne({_id: id})
            .then(user =>{
                user = user.toObject();
                if(!user){
                    res.send('invalid id or token');
                    return
                }
                const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
                try {
                    const payload = jwt.verify(token,secret);
                    res.render('user/resetUserPassword',{email: user.email, id: id, token})
                }catch(err){
                    res.send(err.message);
                }
            })
            .catch(err => {res.send(err.message)});
    }

    updatePassword(req, res, next){
        const {id, token} = req.params
        User.findOne({_id: id})
            .then(user =>{
                user = user.toObject();
                if(!user){
                    res.send('invalid id or token');
                    return
                }
                const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
                try {
                    const payload = jwt.verify(token,secret);
                    bcryt.hash(req.body.password,10,function (err, hashedPass) {
                        if (err){ 
                            res.json(err) 
                            return 
                        };
                        User.updateOne({ _id: id}, {$set: {password: hashedPass}})
                            .then(() => res.redirect('/loginpage'))
                            .catch(err =>{res.json(err.message)});
                    })
                }catch(err){
                    res.send(err.message);
                }
            })
            .catch(err => {res.send(err.message)});
    }
}

module.exports = new UserController();
