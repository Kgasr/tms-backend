const express = require("express");
const router = express.Router();
const workItemAssignmentController = require('../controllers/workItemAssignmentController');

router.get('/getGetWorkItemsAssignmentPaging',workItemAssignmentController.getWorkItemAssignmentWithPaging);
router.get('/getStatus',workItemAssignmentController.getStatus);
router.get('/getEmployee',workItemAssignmentController.getEmployee);

module.exports = router