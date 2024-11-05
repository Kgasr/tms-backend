const subTaskService = require("../services/subTaskService")


// Returns all the subtasks matching the query params supplied.
const getSubTasks = async (req, res) => {
    try{
        const subTasks = await subTaskService.getSubTasks(req.query);
        res.status(200).json({ data: subTasks });
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch SubTasks data', error: error.message});
    }
}

// Returns tasks (with pagination) matching the query params supplied 
const getSubTasksWithPaging = async (req, res) => {
    try{
        const result = await subTaskService.getSubTasksWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordsets[0], totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch SubTasks data', error: error.message});
    }
}

// Add or Update a sub task record
const addUpdateSubTask = async (req, res) => {
    try{
        const result = await subTaskService.addUpdateSubTask(req.body);
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ success: true, message: 'SubTask saved/updated successfully!'});
          }
          else {
            res.status(500).json({ message: 'Failed to add/update SubTask' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Failed to add/update SubTask : ', error: error.message });
    }
}



module.exports = {
    getSubTasks,
    getSubTasksWithPaging,
    addUpdateSubTask
}