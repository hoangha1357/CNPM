const express = require('express');
const route = express.Router();

const menu_Controller = require('../app/controllers/MenuController');

route.get('/create', menu_Controller.create);
route.post('/store', menu_Controller.store);
route.post('/handle-form-action',menu_Controller.handleFormAction);
route.get('/:id/edit', menu_Controller.edit);
route.put('/:id', menu_Controller.update);
route.patch('/:id/restore', menu_Controller.restore);
route.delete('/:id', menu_Controller.delete);
route.delete('/:id/force', menu_Controller.permanentdelete);
route.get('/', menu_Controller.index);

module.exports = route;
