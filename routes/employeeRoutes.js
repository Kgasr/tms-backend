const express = require("express");
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/getRoles', employeeController.getRoles)
router.get('/getEmployees',employeeController.getEmployees);
router.get('/getEmployeesWithPaging',employeeController.getEmployeesWithPaging)

router.post('/addUpdateEmployee',employeeController.registerEmployee);

module.exports = router