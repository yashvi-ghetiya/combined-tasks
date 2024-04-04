const { executeQueryselect } = require('../../database_functions/executeQuery');

const t2_tic_tac_toe = async (req, res, next) => {
    try {
        query = "select firstname,lastname from users_task12 where id=? and status=1;";
        values = [req.id]
        result = await executeQueryselect("combinedTask", query, values);
        res.render('./(t2)tic-tac-toe/tic-tac-toe.ejs', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
    catch (err) {
        res.redirect('/error');
    }
}
module.exports = t2_tic_tac_toe;