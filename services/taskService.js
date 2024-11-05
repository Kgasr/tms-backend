const { sql, poolPromise } = require("./dbService");

// Returns all the tasks matching the query params supplied.
const getTasks = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    request.input('TaskId', sql.Int, params.taskId);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('ProjectId', sql.Int, params.projectId);
    const result = await request.execute('uspGetTasks');
    return result.recordset;
  } catch (err) {
    throw new Error('Error fetching tasks details from database : ' + err.message);
  }
}

// Returns tasks (with pagination) matching the query params supplied 
const getTasksWithPaging = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('PageNum', sql.Int, params.pageNum);
    request.input('PageSize', sql.Int, params.pageSize);
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    request.input('TaskId', sql.Int, params.taskId);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('TaskName', sql.NVarChar(500), params.taskName);
    request.input('ProjectId', sql.Int, params.projectId);
    request.output('TotalRecords', sql.Int);

    return await request.execute('uspGetTasksWithPaging');
  } catch (err) {
    throw new Error('Error fetching tasks details from database : ' + err.message);
  }
}

// Add or Update an task record
const addUpdateTask = async (data) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('TaskId', sql.Int, data.taskId);
    request.input('TaskName', sql.NVarChar(500), data.taskName);
    request.input('TaskDescription', sql.NVarChar(500), data.taskDescription);
    request.input('ActivityId', sql.Int, data.activityId);
    request.input('IsActive', sql.Bit, data.isActive);
    request.input('ProjectId', sql.Int, data.projectId);
    request.input('UpdateFlag', sql.Bit, data.updateFlag);
    return await request.execute('uspAddUpdateTask');
  } catch (err) {
    throw new Error('Error adding/updating task details in database : ' + err.message);
  }
}

module.exports = {
  getTasks,
  getTasksWithPaging,
  addUpdateTask
};