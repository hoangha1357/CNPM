const express = require('express');
const route = express.Router();

const ManagerController = require('../app/controllers/ManagerController');

route.get('/viewrevenue', ManagerController.viewrevenue);
route.get('/trash', ManagerController.trash);


module.exports = route;
