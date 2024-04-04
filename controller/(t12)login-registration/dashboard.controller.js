
const { executeQueryselect } = require('../../database_functions/executeQuery');


const dashboard = async function (req, res) {
    let query, values, result;
    query = "select firstname,lastname from users_task12 where id=? and status=1;";
    values = [req.id];
    try {
        result = await executeQueryselect("combinedTask", query, values);
        res.render('./(t12)login-registration/html/dashboard', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
    catch (err) {
        res.redirect('/error');
    }
}
module.exports = dashboard;