const { sql, poolPromise } = require('./dbService');

// Returns all the projects matching the query params supplied.
const getProjects = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        if (params) {
            if (params.projectId && params.projectId != 0 && params.projectId != '') {
                request.input('ProjectId', sql.Int, params.projectId);
            }
            if (params.searchText && params.searchText != '') {
                request.input('SearchProjectText', sql.NVarChar(100), params.searchText);
            }
        }
        return await request.execute('uspGetActiveProjects');
    } catch (err) {
        throw new Error('Error fetching projects details from database :' + err.message);
    }
}

// Returns projects (with pagination) matching the query params supplied 
const getProjectsWithPaging = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('PageNum', sql.Int, params.pageNum);
        request.input('PageSize', sql.Int, params.pageSize);
        request.output('TotalRecords', sql.Int);
        return await request.execute('uspGetAllProjects');
    } catch (error) {
        throw new Error('Error fetching projects details from database:' + err.message);
    }
}

// Add or Update an project record
const addUpdateProject = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('ProjectId', sql.Int, data.projectId);
        request.input('ProjectName', sql.NVarChar(500), data.projectName);
        request.input('ProjectDescription', sql.NVarChar(500), data.projectDescription);
        request.input('IsActive', sql.Bit, data.isActive);
        request.input('UpdateFlag', sql.Bit, data.updateFlag);
        return await request.execute('uspAddUpdateProject');
    } catch (err) {
        throw new Error('Error adding/updating project details in database:' + err.message);
    }
}

const updateProjectAssignmentStatus = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request(); 
        request.input('UserId', sql.NVarChar(100), data.userId);
        request.input('ProjectId', sql.Int, data.projectId);
        return await request.execute('uspAddUpdateProjectMember');
    } catch (err) {
        throw new Error('Error updating project assignment status in database :' + err.message);
    }
}

module.exports = {
    getProjects,
    getProjectsWithPaging,
    addUpdateProject,
    updateProjectAssignmentStatus
}