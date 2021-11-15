const express = require('express');
const route = express.Router();

const tableReservation_controller = require('../app/controllers/TableReservationController');

route.get('/', tableReservation_controller.search);

module.exports = route;
