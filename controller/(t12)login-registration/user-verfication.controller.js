const { executeselectQuery } = require('../../database_functions/executeQuery');


const userVerificationGet = async function (req, res) {
    res.render('./(t12)login-registration/html/userVerification.ejs');
}

const userVerificationPost = async function (req, res) {
    let result = null;
    if (req.body['email'] != '') {
        try {
        }
        catch (err) {
            res.redirect('/error');
        }
        result = await executeselectQuery('combinedTask', `select * from users_task12 where email='${req.body['email']}';`);
    }
    if (req.body['mobile'] != '') {
        try {
            result = await executeselectQuery('combinedTask', `select * from users_task12 where contact='${req.body['mobile']}' and status=1;`);
        }
        catch (err) {
            res.redirect('/error');
        }
    }
    res.send({ result: result, resultlength: result.length });
}

module.exports = { userVerificationGet, userVerificationPost };
