var crypto = require('crypto');
const { executeQueryUpdate_simpleQuery } = require('../../database_functions/executeQuery');
const activateCode = require("express").Router();

activateCode.post('/dashboard/task-12/activate-code', async function (req, res) {
    var activationcode = crypto.randomBytes(32).toString('hex').slice(0, 12);
    let curdate = new Date();
    curdate = `${curdate.toISOString().replace('T', ' ').split(' ')[0]} ${curdate.getHours()}:${curdate.getMinutes()}:${curdate.getSeconds()}:${curdate.getMilliseconds()}`;
    var res1 = await executeQueryUpdate_simpleQuery('registration', `update users set activation_code='${activationcode}',activate_code_update='${curdate}' where activation_code='${req.body['data']}'`);
    res.send({ message: "Link Activated\n\nEnter Password to Activate Account", activationcode: activationcode });
 });

 module.exports=activateCode;
 