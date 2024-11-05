const { sql, poolPromise } = require('./dbService');

const getStatusBasedReportWithPaging = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('PageNum', sql.Int, params.pageNum);
        request.input('PageSize', sql.Int, params.pageSize);
        // Handle date parameters based on rangeFlagChecke
        if (params.rangeFlagChecked === '1') {
            request.input('DateFrom', sql.DateTime, params.dateFrom);
            request.input('DateTo', sql.DateTime, params.dateTo);
        }
        request.input('RangeFlagChecked', sql.Bit, params.rangeFlagChecked === '1' ? 1 : 0);
        request.input('StatusId', sql.Int, params.statusId);
        request.input('ProjectId', sql.Int, params.projectId);
        request.output('TotalRecords', sql.Int);
        return await request.execute('uspGetStatusBasedReportWithPaging');
    } catch (error) {
        throw new Error('Error fetching status based report details from database:' + error.message);
    }
}

const getStatusBasedReport = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        if (params.rangeFlagChecked === '1') {
            request.input('DateFrom', sql.DateTime, params.dateFrom);
            request.input('DateTo', sql.DateTime, params.dateTo);
        }
        request.input('RangeFlagChecked', sql.Bit, params.rangeFlagChecked === '1' ? 1 : 0);
        request.input('StatusId', sql.Int, params.statusId);
        request.input('ProjectId', sql.Int, params.projectId);
        return await request.execute('uspGetStatusBasedReport');
    } catch (error) {
        throw new Error('Error fetching status based report details from database:' + error.message);
    }
}

const getAssigneeBasedReportWithPaging = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('PageNum', sql.Int, params.pageNum);
        request.input('PageSize', sql.Int, params.pageSize);
        // Handle date parameters based on rangeFlagChecke
        if (params.rangeFlagChecked === '1') {
            request.input('DateFrom', sql.DateTime, params.dateFrom);
            request.input('DateTo', sql.DateTime, params.dateTo);
        }
        request.input('RangeFlagChecked', sql.Bit, params.rangeFlagChecked === '1' ? 1 : 0);
        request.input('UserId', sql.NVarChar(500), params.userId);
        request.input('ProjectId', sql.Int, params.projectId);
        request.output('TotalRecords', sql.Int);
        return await request.execute('uspGetAssigneeBasedReportWithPaging');
    } catch (error) {
        throw new Error('Error fetching assignee based report details from database:' + error.message);
    }
}
const getAssigneeBasedReport = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        if (params.rangeFlagChecked === '1') {
            request.input('DateFrom', sql.DateTime, params.dateFrom);
            request.input('DateTo', sql.DateTime, params.dateTo);
        }
        request.input('RangeFlagChecked', sql.Bit, params.rangeFlagChecked === '1' ? 1 : 0);
        request.input('UserId', sql.NVarChar(500), params.userId);
        request.input('ProjectId', sql.Int, params.projectId);
        return await request.execute('uspGetAssigneeBasedReport');
    } catch (error) {
        throw new Error('Error fetching assignee based report details from database:' + error.message);
    }
}
const getTimeBasedReportWithPaging = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('PageNum', sql.Int, params.pageNum);
        request.input('PageSize', sql.Int, params.pageSize);
        request.input('DateFrom', sql.DateTime, params.dateFrom);
        request.input('DateTo', sql.DateTime, params.dateTo);
        request.input('ProjectId', sql.Int, params.projectId);
        request.output('TotalRecords', sql.Int);
        return await request.execute('uspGetTimeBasedReportWithPaging');
    } catch (error) {
        throw new Error('Error fetching time based report details from database:' + error.message);
    }
}
const getTimeBasedReport = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('DateFrom', sql.DateTime, params.dateFrom);
        request.input('DateTo', sql.DateTime, params.dateTo);
        request.input('ProjectId', sql.Int, params.projectId);
        return await request.execute('uspGetTimeBasedReport');
    } catch (error) {
        throw new Error('Error fetching time based report details from database:' + error.message);
    }
}
module.exports = {
    getStatusBasedReportWithPaging,
    getStatusBasedReport,
    getAssigneeBasedReportWithPaging,
    getAssigneeBasedReport,
    getTimeBasedReportWithPaging,
    getTimeBasedReport
}