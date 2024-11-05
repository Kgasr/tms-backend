const { sql, poolPromise } = require("./dbService");

// Returns all the subtasks matching the query params supplied.
const getSubTasks = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    request.input('SubTaskId', sql.Int, params.subTaskId);
    request.input('TaskId', sql.Int, params.taskId);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('SubTaskName', sql.NVarChar(500), params.subTaskName);
    request.input('ProjectId', sql.Int, params.projectId);
    return await request.execute('uspGetSubTasks');
  } catch (err) {
    throw new Error('Error fetching subtasks details from database' + err.message);
  }
}

// Returns subtasks (with pagination) matching the query params supplied 
const getSubTasksWithPaging = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('PageNum', sql.Int, params.pageNum);
    request.input('PageSize', sql.Int, params.pageSize);
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    request.input('SubTaskId', sql.Int, params.subTaskId);
    request.input('TaskId', sql.Int, params.taskId);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('SubTaskName', sql.NVarChar(500), params.subTaskName);
    request.input('ProjectId', sql.Int, params.projectId);
    request.output('TotalRecords', sql.Int);
    return await request.execute('uspGetSubTasksWithPaging');
  } catch (err) {
    throw new Error('Error fetching subtasks details from database' + err.message);
  }
}

// Add or Update an subtask record
const addUpdateSubTask = async (data) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('SubTaskId', sql.Int, data.subTaskId);
    request.input('SubTaskName', sql.NVarChar(500), data.subTaskName);
    request.input('SubTaskDescription', sql.NVarChar(500), data.subTaskDescription);
    request.input('ActivityId', sql.Int, data.activityId);
    request.input('TaskId', sql.Int, data.taskId);
    request.input('IsActive', sql.Bit, data.isActive);
    request.input('ProjectId', sql.Int, data.projectId);
    request.input('UpdateFlag', sql.Bit, data.updateFlag);
    return await request.execute('uspAddUpdateSubTask');
  } catch (err) {
    throw new Error('Error adding/updating subtask details in database' + err.message);
  }
}


module.exports = {
  getSubTasks,
  getSubTasksWithPaging,
  addUpdateSubTask
};