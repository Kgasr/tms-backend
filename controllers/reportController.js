const reportService = require("../services/reportService")


// Returns projects (with pagination) matching the query params supplied 
const getStatusBasedReportWithPaging = async (req, res) => {
    try {
        const result = await reportService.getStatusBasedReportWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordset, totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the status based report data', error: error.message });
    }
}
const getStatusBasedReport = async (req, res) => {
    try {
        const result = await reportService.getStatusBasedReport(req.query);
        res.status(200).json({ data: result.recordset});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the status based report data', error: error.message });
    }
}

const getAssigneeBasedReportWithPaging = async (req, res) => {
    try {
        const result = await reportService.getAssigneeBasedReportWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordset, totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the assignee based report data', error: error.message });
    }
}
const getAssigneeBasedReport = async (req, res) => {
    try {
        const result = await reportService.getAssigneeBasedReport(req.query);
        res.status(200).json({ data: result.recordset});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the assignee based report data', error: error.message });
    }
}
const getTimeBasedReportWithPaging = async (req, res) => {
    try {
        const result = await reportService.getTimeBasedReportWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordset, totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the time based report data', error: error.message });
    }
}
const getTimeBasedReport = async (req, res) => {
    try {
        const result = await reportService.getTimeBasedReport(req.query);
        res.status(200).json({ data: result.recordset});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the time based report data', error: error.message });
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