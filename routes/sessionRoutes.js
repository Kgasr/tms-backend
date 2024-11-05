const express = require("express");
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/checkSession', sessionController.checkSession);

module.exports = router

