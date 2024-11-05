const { sql, poolPromise } = require('./dbService');


// Creates a Table-Valued Parameter for ProjectIdList
const createProjectListTVP = (projectList) => {
    const tvp = new sql.Table();
    tvp.columns.add('ProjectID', sql.Int);
    projectList.forEach(project => {
        tvp.rows.add(project);
    });
    return tvp;
};

// Returns all the roles matching the query params supplied.
const getRoles = async (roleName) => {
    try {
        const pool = await poolPromise;
        const request = await pool.request();
        if (roleName) {
            request.input('RoleName', sql.NVarChar(50), roleName);
        } else {
            request.input('RoleName', sql.NVarChar(50), null);
        }
        const result = await request.execute('uspGetRoles');
        return result.recordset;
    } catch (err) {
        throw new Error('Error fetching roles details from database' + err.message);
    }
}

// Returns all the employess matching the query params supplied.
const getEmployees = async (params) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('UserId', sql.NVarChar(100), params.userId);
        request.input('ProjectId', sql.Int, params.projectId);
        request.input('ProjectAssignmentStatus', sql.Int, params.projectAssignmentStatus);
        request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
        const result = await request.execute('uspGetEmployees');
        return result.recordset;
    } catch (err) {
        throw new Error('Error fetching employees details from database' + err.message);
    }
}


// Returns employees (with pagination) matching the query params supplied 
const getEmployeesWithPaging = async (params) => {
    try {

        const pool = await poolPromise;
        const request = pool.request();
        // Define the table type for ProjectIdList
        const projectIdList = new sql.Table('ProjectList'); // Make sure this matches your SQL Server table type name
        projectIdList.columns.add('ProjectID', sql.Int);

        if (params.projectIdList && params.projectIdList.length > 0) {
            params.projectIdList.forEach((project) => {
                projectIdList.rows.add(project);
            });
        }
        request.input('PageNum', sql.Int, params.pageNum);
        request.input('PageSize', sql.Int, params.pageSize);
        request.input('IsActive', sql.Bit, params.isActive == 'true' ? 1 : 0);
        request.input('UserId', sql.NVarChar(100), params.userId);
        request.input('EmpName', sql.NVarChar(100), params.empName);
        request.input('Email', sql.NVarChar(300), params.email);
        request.input('RoleId', sql.Int, params.roleId);
        request.input('ProjectIdList', projectIdList); // Table-valued parameter
        request.output('TotalRecords', sql.Int);

        // Execute the stored procedure
        return await request.execute('uspGetEmployeesWithPaging');
    } catch (err) {
        throw new Error('Error fetching employees details from database' + err.message);
    }
}

// Add or Update an employee record
const registerEmployee = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('UserId', sql.NVarChar(50), data.userId);
        request.input('EmpName', sql.NVarChar(500), data.empName);
        request.input('RoleID', sql.Int, data.roleId);
        request.input('Password', sql.NVarChar(500), data.password);
        request.input('IsActive', sql.Bit, data.isActive);
        request.input('Remark', sql.NVarChar(500), data.remarks);
        request.input('Email', sql.NVarChar(500), data.email);
        request.input('Pic', sql.VarBinary(sql.MAX), data.pic != null ? Buffer.from(data.pic, 'base64') : null);
        request.input('ProjectIdList', createProjectListTVP(data.projectIdList));
        request.input('UpdateFlag', sql.Int, data.updateFlag);
        return await request.execute('uspAddUpdateEmployee');
    }
    catch (err) {
        throw new Error('Error adding/updating employee details in database' + err.message);
    }
}

module.exports = {
    getRoles,
    getEmployees,
    getEmployeesWithPaging,
    registerEmployee
}