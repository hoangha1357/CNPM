const express = require('express');
const route = express.Router();

const booktable_controller = require('../app/controllers/BooktableController');

route.post('/thankyou', booktable_controller.booktable_thankyou);
route.get('/', booktable_controller.booktable);

module.exports = route;
