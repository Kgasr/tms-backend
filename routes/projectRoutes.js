const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/getProjects',projectController.getProjects);
router.get('/getProjectsWithPaging',projectController.getProjectsWithPaging);

router.post('/addUpdateProject',projectController.addUpdateProject);
router.post('/updateProjectAssignmentStatus',projectController.updateProjectAssignmentStatus);

module.exports = router