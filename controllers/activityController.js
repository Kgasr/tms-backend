const activityService = require("../services/activityService")

// Returns all the activities matching the query params supplied.
const getActivities = async (req, res) => {
    try {
        const activities = await activityService.getActivities(req.query);
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch activities data', error: error.message});
    }
};

// Returns activities (with pagination) matching the query params supplied 
const getActivitiesWithPaging = async (req, res) => {
    try{
        const result = await activityService.getActivitiesWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        const activities = result.recordsets[0];
        res.status(200).json({data: activities, totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch activities data', error: error.message});
    }
}

// Add or Update an activity record
const addUpdateActivity = async (req, res) => {
    try{
        const result = await activityService.addUpdateActivity(req.body);
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ message: 'Activity saved/updated successfully!'});
          }
          else {
            res.status(500).json({ message: 'Failed to add/update activity' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Failed to add/update activity : ', error: error.message });
    }
}

module.exports = {
    getActivities,
    getActivitiesWithPaging,
    addUpdateActivity
}