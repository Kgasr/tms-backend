const taskService = require("../services/taskService")

// Returns all the tasks matching the query params supplied.
const getTasks = async (req, res) => {
    try{
        const result = await taskService.getTasks(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch tasks data', error: error.message});
    }
}

// Returns tasks (with pagination) matching the query params supplied 
const getTasksWithPaging = async (req, res) => {
    try{
        const result = await taskService.getTasksWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordsets[0], totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch tasks data', error: error.message});
    }
}

// Add or Update an task record
const addUpdateTask = async (req, res) => {
    try{
        const result = await taskService.addUpdateTask(req.body);
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ message: 'Task saved/updated successfully!'});
          }
          else {
            res.status(500).json({ message: 'Failed to add/update task' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Failed to add/update task : ', error: error.message });
    }
}

module.exports = {
    getTasks,
    getTasksWithPaging,
    addUpdateTask
}