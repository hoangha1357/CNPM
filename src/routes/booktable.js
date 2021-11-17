const express = require('express');
const route = express.Router();

const BookTableController = require('../app/controllers/BookTableController');

route.post('/thankyou', BookTableController.thankyou);
route.get('/reservated', BookTableController.reservated);
route.get('/', BookTableController.booktable);

module.exports = route;
