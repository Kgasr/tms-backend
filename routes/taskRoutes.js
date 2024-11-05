const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');


router.get('/getTasks',taskController.getTasks);
router.get('/getTasksWithPaging',taskController.getTasksWithPaging);

router.post('/addUpdateTask',taskController.addUpdateTask);

module.exports = router