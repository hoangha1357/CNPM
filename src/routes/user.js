const express = require('express');
const route = express.Router();

const User_Controller = require('../app/controllers/UserController');

// route.get('/stored/ordered', User_Controller.ordered);
route.get('/viewrevenue', User_Controller.viewrevenue);
route.get('/trash', User_Controller.trash);

module.exports = route;
