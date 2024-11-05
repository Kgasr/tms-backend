const workItemAssignmentService = require("../services/workItemAssignmentService")

const getWorkItemAssignmentWithPaging = async (req, res) => {
    try{
        const result = await workItemAssignmentService.getworkItemAssignmentWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordsets[0], totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch WorkItem data', error});
    }
}
const getStatus = async (req, res) => {
    try{
        const result = await workItemAssignmentService.getStatus(req.query);
        res.status(200).json({data: result.recordset});
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch workitem status data', error});
    }
}
const getEmployee = async (req, res) => {
    try{
        const result = await workItemAssignmentService.getEmployee(req.query);
        res.status(200).json({data: result.recordset});
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch workitem status data', error});
    }
}


module.exports = {
    getWorkItemAssignmentWithPaging,
    getStatus,
    getEmployee
}