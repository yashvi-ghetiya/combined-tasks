let crypto = require('crypto');
let md5 = require('md5');
const { executeQueryUpdate_simpleQuery } = require('../../database_functions/executeQuery');


const activate_user = async function (req, res) {
    let salt = crypto.randomBytes(32).toString('hex').slice(0, 6);
    try{
    let res1 = await executeQueryUpdate_simpleQuery('combinedTask', `update users_task12 set status=${true},password='${md5(req.body['pass1'] + salt)}',password_salt='${salt}' where activation_code='${req.params.code}'`);
    res.send({ message: "Account Activated\n\nLogin To Experience Our Services" });
}
catch (err) {
    res.redirect('/error');
}
};
module.exports = activate_user;