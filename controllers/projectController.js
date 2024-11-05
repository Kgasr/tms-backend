const projectService = require("../services/projectService")


// Returns all the projects matching the query params supplied.
const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects(req.query);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the projects data', error: error.message });
    }
};


// Returns projects (with pagination) matching the query params supplied 
const getProjectsWithPaging = async (req, res) => {
    try {
        const result = await projectService.getProjectsWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordset, totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the projects data', error: error.message });
    }
}

// Add or Update an project record
const addUpdateProject = async (req, res) => {
    try {
        const result = await projectService.addUpdateProject(req.body);
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ message: 'Project saved/updated successfully!'});
        }
        else {
            res.status(500).json({ message: 'Failed to add/update project' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to add/update project : ', error: error.message });
    }
}


// Update project assignment status for the employees to Assigned or Unassigned.
const updateProjectAssignmentStatus = async (req, res) => {
    try {
        const result = await projectService.updateProjectAssignmentStatus(req.body);
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ message: 'Project Assignment Status updated successfully!'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Project Assignment Status', error : error.message});
    }
}


module.exports = {
    getProjects,
    getProjectsWithPaging,
    addUpdateProject, 
    updateProjectAssignmentStatus
}