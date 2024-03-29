const combinedTask = require("express").Router();
const { executeQuery} = require('../../database_functions/executeQuery');

combinedTask.get("/task-12/registration", (req, res) => {
    res.render('./task-12/html/registration.ejs');
})

module.exports = combinedTask;