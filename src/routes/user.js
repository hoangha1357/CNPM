const express = require('express');
const passport = require('passport');
const route = express.Router();

const UserController = require('../app/controllers/UserController');
const authenticateUser = require('../app/middlewares/Authenticate');
const requireLogin = require('../app/middlewares/LoginRequires');

route.get('/ordered', UserController.ordered);
route.post('/register', UserController.register);
route.put('/:id', UserController.updateImage);
route.post('/login', UserController.login, authenticateUser);
route.get('/logout', UserController.logout);
route.get('/payment', UserController.payment);
route.get('/', UserController.index);

module.exports = route;
