const updatePassword = require("express").Router();
const { executeQuery} = require('../../database_functions/executeQuery');
updatePassword.post('/task-12/updatePassword', async function (req, res) {
    res.render('./task-12/html/updatePassword.ejs');
});
module.exports = updatePassword;