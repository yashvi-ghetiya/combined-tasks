const { executeQueryselect } = require('../../database_functions/executeQuery');

const t10_display = async (req, res) => {
    let query, values, result,result1;
    query = "select firstname,lastname from users_task12 where id=? and status=1;";
    values = [req.id];
    try {
        result = await executeQueryselect("combinedTask", query, values);
        res.render('./(t10)json-placeholder-fetch-api/html/displayAll', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
    catch (err) {
        res.redirect('/error');
    }
};

const t10_display_by_id = async function (req, res) {
    let query, values, result,result1;
    query = "select firstname,lastname from users_task12 where id=? and status=1;";
    values = [req.id];
    try{
        result = await executeQueryselect("combinedTask", query, values);
    res.render('./(t10)json-placeholder-fetch-api/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    } catch (err) {
        res.redirect('/error');
    }
};

module.exports = { t10_display, t10_display_by_id };