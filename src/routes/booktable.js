const express = require('express');
const route = express.Router();

const BookTableController = require('../app/controllers/BookTableController');

route.get('/', BookTableController.booktable);

module.exports = route;
