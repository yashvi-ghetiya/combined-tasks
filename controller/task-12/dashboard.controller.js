const dashboard = require("express").Router();

dashboard.get('/dashboard/task-12/dashboard', async function (req, res) {
    res.render('./task-12/html/dashboard.ejs');
});
module.exports = dashboard;