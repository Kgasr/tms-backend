const express = require("express");
const router = express.Router();
const reportController = require('../controllers/reportController');

//Status Based Report Route
router.get('/getStatusBasedReportWithPaging',reportController.getStatusBasedReportWithPaging);
router.get('/getStatusBasedReport',reportController.getStatusBasedReport);
//Assignee Based Report Route
router.get('/getAssigneeBasedReportWithPaging',reportController.getAssigneeBasedReportWithPaging);
router.get('/getAssigneeBasedReport',reportController.getAssigneeBasedReport);
//Time Based Report Route
router.get('/getTimeBasedReportWithPaging',reportController.getTimeBasedReportWithPaging);
router.get('/getTimeBasedReport',reportController.getTimeBasedReport);

module.exports = router