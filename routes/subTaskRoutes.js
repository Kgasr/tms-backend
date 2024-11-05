const express = require("express");
const router = express.Router();

const subTaskController = require('../controllers/subTaskController');


router.get('/getSubTasks',subTaskController.getSubTasks);
router.get('/getSubTasksWithPaging',subTaskController.getSubTasksWithPaging);

router.post('/addUpdateSubTask',subTaskController.addUpdateSubTask);

module.exports = router