const { sql, poolPromise } = require("./dbService");


//Page Create WorkItem
const addUpdateWorkItem = async (data) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('WorkItemId', sql.Int, data.workItemId);
    request.input('ActivityId', sql.Int, data.activityId);
    request.input('TaskId', sql.Int, data.taskId);
    request.input('SubTaskId', sql.Int, data.subTaskId);
    request.input('WorkItemDescription', sql.NVarChar(500), data.workItemDescription);
    request.input('ProjectId', sql.Int, data.projectId);
    request.input('UpdateFlag', sql.Bit, data.updateFlag);
    return await request.execute('uspAddUpdateWorkItem');
  } catch (err) {
    throw new Error('Error adding/updating workitem details' + err.message);
  }
}

const getWorkItemsWithPaging = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('PageNum', sql.Int, params.pageNum);
    request.input('PageSize', sql.Int, params.pageSize);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('TaskId', sql.Int, params.taskId);
    request.input('SubTaskId', sql.Int, params.subTaskId);
    request.input('ProjectId', sql.Int, params.projectId);
    request.output('TotalRecords', sql.Int);

    return await request.execute('uspGetWorkItems');
  } catch (error) {
    throw new Error('Error fetching workitems details' + err.message);
  }
}
module.exports = {
  getWorkItemsWithPaging,
  addUpdateWorkItem
};