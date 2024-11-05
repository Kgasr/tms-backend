const workItemService = require("../services/workItemService")

const getWorkItemsWithPaging = async (req, res) => {
    try{
        const result = await workItemService.getWorkItemsWithPaging(req.query);
        const totalRecords = result.output.TotalRecords;
        res.status(200).json({ data: result.recordsets[0], totalRecords: totalRecords });
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch WorkItem data', error: error.message});
    }
}

const addUpdateWorkItem = async (req, res) => {
    try{
        const result = await workItemService.addUpdateWorkItem(req.body);
        if (result.rowsAffected.length > 0 && result.rowsAffected[0] >= 1) {
            res.status(200).json({ message: 'WorkItem saved/updated successfully!'});
          }
          else {
            res.status(500).json({ message: 'Failed to add/update WorkItem' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Failed to add/update WorkItem : ', error: error.message });
    }
}

module.exports = {
    getWorkItemsWithPaging,
    addUpdateWorkItem
}