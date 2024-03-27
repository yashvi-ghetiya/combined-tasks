const json_placeholder_fetch_api = require("express").Router();

json_placeholder_fetch_api.get("/dashboard/task-10/display",async (req, res) => {

    res.render('./task-10/html/displayAll');
});

json_placeholder_fetch_api.get('/dashboard/task-10/display/:id',async function (req, res) { 
    res.render('./task-10/html/display');
 });

module.exports = json_placeholder_fetch_api;