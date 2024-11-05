const { sql, poolPromise } = require("./dbService");

const getworkItemAssignmentWithPaging = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('PageNum', sql.Int, params.pageNum);
    request.input('PageSize', sql.Int, params.pageSize);
    request.input('FilterFlag', sql.Bit, params.filterFlag=='true' ? 1:0);
    request.input('ProjectId', sql.Int, params.projectId);
    request.output('TotalRecords', sql.Int);

    return await request.execute('uspGetWorkItemsAssignment');
  } catch (error) {
    throw new Error('Error fetching workItemAssignment details' + err.message);
  }
}
const getStatus = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('ExcludeHandedOver', sql.Bit, params.excludeHandedOver==true ? 1 : 0);
    return await request.execute('uspGetStatus');
  } catch (error) {
    throw new Error('Error fetching workitem status details' + err.message);
  }
}
const getEmployee = async (params) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('UserId', sql.NVarChar(500), params.userId);
    request.input('ProjectId', sql.Int, params.projectId);
    request.input('ProjectAssignmentStatus', sql.Int, params.projectAssignmentStatus);
    request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
    return await request.execute('uspGetEmployees');
  } catch (error) {
    throw new Error('Error fetching workitem status details' + err.message);
  }
}
module.exports = {
    getworkItemAssignmentWithPaging,
    getStatus,
    getEmployee
};