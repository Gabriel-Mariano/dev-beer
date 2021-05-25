const express = require('express');
const route = express.Router();

const userController = require('./controllers/userController');

route.post('/register',userController.create);
route.post('/login',userController.login);

module.exports = route;