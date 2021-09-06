const express = require('express')
const route = express.Router()

const menu_Controller = require('../app/controllers/MenuController')

route.use('/', menu_Controller.index)

module.exports = route