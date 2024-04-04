
const { executeQuery } = require('../../database_functions/executeQuery');


const dashboard = async function (req, res) {
    try {
        let userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id='${req.id}' and status=1;`);
        console.log(userName)
        res.render('./(t12)login-registration/html/dashboard', { firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    }
    catch (err) {
        res.redirect('/error');
    }
}
module.exports = dashboard;