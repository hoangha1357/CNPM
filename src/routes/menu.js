const express = require('express');
const route = express.Router();

const menu_Controller = require('../app/controllers/MenuController');

route.use('/:slug', menu_Controller.show);
route.use('/', menu_Controller.index);

module.exports = route;
