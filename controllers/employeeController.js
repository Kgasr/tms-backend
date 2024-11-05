const employeeService = require("../services/employeeService");

// Returns the Roles Data for the query params supplied.
const getRoles = async (req, res) => {
    try {
        const roles = await employeeService.getRoles(req.query.roleName);
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch roles data : ', error: error.message });
    }
};

// Returns all the employees matching the query params supplied.
const getEmployees = async (req, res) => {
    try{
        const employees = await employeeService.getEmployees(req.query);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees data : ', error: error.message });
    }
}

// Returns employees (with pagination) matching the query params supplied
const getEmployeesWithPaging = async (req, res) => {
    try {
        const result = await employeeService.getEmployeesWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        const employees = result.recordsets[0];
        res.status(200).json({data: employees, totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees data : ', error: error.message });
    }
}

// Add or Update an employee record
const registerEmployee = async (req, res) => {
    try {
        const result = await employeeService.registerEmployee(req.body)
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ message: 'Employee registered/updated successfully!' });
        }
        else {
            res.status(500).json({ message: 'Failed to add/update employee' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to add/update employee : ', error: error.message });
    }
}

module.exports = {
    getRoles,
    getEmployees,
    getEmployeesWithPaging,
    registerEmployee
}