const express = require('express');
const passport = require('passport');
const route = express.Router();

const UserController = require('../app/controllers/UserController');
const authenticateUser = require('../app/middlewares/Authenticate');
const requireLogin = require('../app/middlewares/LoginRequires');

route.post('/remove-from-cart/:id',UserController.removeFromCart);
route.get('/ordered', requireLogin, UserController.ordered);
route.post('/add-to-cart/:id',UserController.addToCart);

route.post('/register', UserController.register);
route.put('/updateinfo/:id', requireLogin,UserController.updateImage);
route.get('/payment', requireLogin, UserController.payment);
route.get('/viewtablereservation', requireLogin, UserController.viewTableReservation);
route.post('/login', UserController.login, authenticateUser);
route.get('/resetpassword/:id/:token', UserController.resetPassword);
route.put('/updatepassword/:id/:token', UserController.updatePassword);
route.get('/logout', UserController.logout);
route.get('/', requireLogin, UserController.index);

module.exports = route;
