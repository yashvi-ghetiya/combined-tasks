var crypto = require('crypto');
const { executeQueryInsert } = require('../../database_functions/executeQuery');
const insertUser = require("express").Router();

insertUser.post('/dashboard/task-12/insert-users', async function (req, res) {
    var activationcode = crypto.randomBytes(32).toString('hex').slice(0, 12);
    var data = req.body;
    var res1 = await executeQueryInsert('registration', `insert into users(firstname,lastname,email,contact,activation_code,status)values('${data['firstname']}'
    ,'${data['lastname']}'
    ,'${data['email']}',
    '${data['mobile']}',
    '${activationcode}',
    ${false})`);

    res.send({ activationcode: activationcode });
});
module.exports = insertUser;