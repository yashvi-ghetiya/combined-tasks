
const { executeQuery} = require('../../database_functions/executeQuery');


const dashboard = async function (req, res) {
    var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
    console.log(userName[0]['firstname']);
    res.render('./(t12)login-registration/html/dashboard',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname']});
}
module.exports = dashboard;