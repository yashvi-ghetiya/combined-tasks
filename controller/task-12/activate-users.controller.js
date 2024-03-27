var crypto = require('crypto');
var md5 = require('md5');
const { executeQueryUpdate_simpleQuery } = require('../../database_functions/executeQuery');
const activateUser = require("express").Router();

activateUser.post('/dashboard/task-12/activate-users/:code', async function (req, res) {
    var salt = crypto.randomBytes(32).toString('hex').slice(0, 6);

    var res1 = await executeQueryUpdate_simpleQuery('registration', `update users set status=${true},password='${md5(req.body['pass1'] + salt)}',password_salt='${salt}' where activation_code='${req.params.code}'`);

    res.send({ message: "Account Activated\n\nLogin To Experience Our Services" });
});
module.exports = activateUser;