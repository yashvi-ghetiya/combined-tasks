const { executeselectQuery} = require('../../database_functions/executeQuery');
const userVerification = require("express").Router();

userVerification.get('/dashboard/task-12/userVerification', async function (req, res) {
    res.render('./task-12/html/userVerification.ejs');
});

userVerification.post('/dashboard/task-12/userVerification', async function (req, res) {
    var result = null;

    if (req.body['email'] != '') {
        result = await executeselectQuery('registration', `select * from users where email='${req.body['email']}';`);
    }
    if (req.body['mobile'] != '') {
        result = await executeselectQuery('registration', `select * from users where contact='${req.body['mobile']} and status=1';`);
        console.log(result);
    }

    res.send({ result: result, resultlength: result.length });
});

module.exports = userVerification;