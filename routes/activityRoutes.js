const express = require("express");
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/getActivities',activityController.getActivities);
router.get('/getActivitiesWithPaging',activityController.getActivitiesWithPaging);

router.post('/addUpdateActivity',activityController.addUpdateActivity);

module.exports = router