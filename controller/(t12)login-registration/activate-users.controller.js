let crypto = require('crypto');
let md5 = require('md5');
const { executeQueryupdate } = require('../../database_functions/executeQuery');


const activate_user = async function (req, res) {
    let salt = crypto.randomBytes(32).toString('hex').slice(0, 6);
    try{
    let query = `update users_task12 set status=?,password=?,password_salt=? where activation_code=?`;
    values=[true,md5(req.body['pass1'] + salt),salt,req.params.code];
    executeQueryupdate('combinedTask',query,values);
    res.send({ message: "Account Activated\n\nLogin To Experience Our Services" });
}
catch (err) {
    res.redirect('/error');
}
};
module.exports = activate_user;