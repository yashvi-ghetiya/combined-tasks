const updatePassword = require("express").Router();
updatePassword.post('/dashboard/task-12/updatePassword', async function (req, res) {
    res.render('./task-12/html/updatePassword.ejs');
});
module.exports = updatePassword;