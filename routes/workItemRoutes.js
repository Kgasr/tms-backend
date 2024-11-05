const express = require("express");
const router = express.Router();
const workItemController = require('../controllers/workItemController');

router.get('/getWorkItemsWithPaging',workItemController.getWorkItemsWithPaging);
router.post('/addUpdateWorkItem',workItemController.addUpdateWorkItem);

module.exports = router