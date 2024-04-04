const { executeQueryselect } = require('../../database_functions/executeQuery');


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
        let query= `select * from users_task12 where email=? and status=1;`;
        let values=[req.body['email']];
        result = await executeQueryselect('combinedTask',query,values);
    }
    if (req.body['mobile'] != '') {
        try {
            let query=`select * from users_task12 where contact=? and status=1;`;
            let values=[req.body['mobile']];
            result = await executeQueryselect('combinedTask',query,values);
        }
        catch (err) {
            res.redirect('/error');
        }
    }
    res.send({ result: result, resultlength: result.length });
}

module.exports = { userVerificationGet, userVerificationPost };
