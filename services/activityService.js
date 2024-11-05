const { sql, poolPromise } = require("./dbService");

// Returns all the activities matching the query params supplied.
const getActivities = async (params) => {
  try {
    const pool = await poolPromise;
    const request = await pool.request();
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('ActivityName', sql.NVarChar(500), params.activityName);
    request.input('ProjectId', sql.Int, params.projectId);
    const result = await request.execute('uspGetActivities');
    return result.recordset;
  } catch (err) {
    throw new Error('Error fetching activities details from database' + err.message);
  }
}

// Returns activities (with pagination) matching the query params supplied 
const getActivitiesWithPaging = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('PageNum', sql.Int, params.pageNum);
    request.input('PageSize', sql.Int, params.pageSize);
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    request.input('ActivityId', sql.Int, params.activityId);
    request.input('ActivityName', sql.NVarChar(500), params.activityName);
    request.input('ProjectId', sql.Int, params.projectId);
    request.output('TotalRecords', sql.Int);
    return await request.execute('uspGetActivitiesWithPaging');
  } catch (error) {
    throw new Error('Error fetching activities details from database' + err.message);
  }
}


// Add or Update an activity record
const addUpdateActivity = async (data) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('ActivityId', sql.Int, data.activityId);
    request.input('ActivityName', sql.NVarChar(500), data.activityName);
    request.input('ActivityDescription', sql.NVarChar(500), data.activityDescription);
    request.input('IsActive', sql.Bit, data.isActive);
    request.input('ProjectId', sql.Int, data.projectId);
    request.input('UpdateFlag', sql.Bit, data.updateFlag);
    return await request.execute('uspAddUpdateActivity');
  } catch (err) {
    throw new Error('Error adding/updating activity details in database' + err.message);
  }
}

module.exports = {
  getActivities,
  getActivitiesWithPaging,
  addUpdateActivity
};