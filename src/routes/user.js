const express = require('express');
const passport = require('passport');
const route = express.Router();

const UserController = require('../app/controllers/UserController');
const authenticateUser = require('../app/middlewares/Authenticate');
const requireLogin = require('../app/middlewares/LoginRequires');

route.get('/ordered', UserController.ordered);
route.post('/register', UserController.register);
route.put('/updateinfo/:id',UserController.updateImage);
route.get('/payment', UserController.payment);
route.post('/login', UserController.login, authenticateUser);
route.get('/resetpassword/:id/:token', UserController.resetPassword);
route.put('/updatepassword/:id/:token', UserController.updatePassword);
route.get('/logout', UserController.logout);
route.get('/', UserController.index);

module.exports = route;
