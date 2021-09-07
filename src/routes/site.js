const express = require('express');
const route = express.Router();

const site_controller = require('../app/controllers/SiteController');

route.use('/search', site_controller.search);
route.use('/booktable', site_controller.booktable);
route.use('/register', site_controller.register);
route.use('/', site_controller.home);

module.exports = route;
