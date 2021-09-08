const express = require('express');
const route = express.Router();

const menu_Controller = require('../app/controllers/MenuController');

route.get('/:slug', menu_Controller.show);
route.get('/', menu_Controller.index);

module.exports = route;
