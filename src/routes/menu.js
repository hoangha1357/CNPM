const express = require('express');
const route = express.Router();

const menu_Controller = require('../app/controllers/MenuController');

route.get('/create', menu_Controller.create);
route.post('/store', menu_Controller.store);
route.get('/', menu_Controller.index);

module.exports = route;
