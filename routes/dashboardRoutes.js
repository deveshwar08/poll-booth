const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const {requireAuth} = require('../middleware/authMiddleware');
var route = express.Router();


route.get('/dashboard',requireAuth,dashboardController.dashboard_get);
route.get('/vote/:pollId/:optionId',requireAuth,dashboardController.vote);
route.get('/poll-end/:pollId',requireAuth,dashboardController.poll_end);


module.exports = route;