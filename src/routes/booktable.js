const express = require('express');
const route = express.Router();

const BookTableController = require('../app/controllers/BookTableController');
const requireLogin = require('../app/middlewares/LoginRequires');


route.use(requireLogin)
route.post('/choosetable',requireLogin,BookTableController.choosetable);
route.post('/handle-form-actions',BookTableController.handleFormActions);
route.post('/handle-form-actions-2', BookTableController.handleFormActions2);
route.post('/thankyou', BookTableController.thankyou);
route.get('/reservated',requireLogin, BookTableController.reservated);
route.get('/', requireLogin, BookTableController.booktable);

module.exports = route;
