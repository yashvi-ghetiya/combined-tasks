

const { executeQueryselect } = require('../../database_functions/executeQuery');

const t3_kuku_kube = async (req, res, next) => {
    try {
        query = "select firstname,lastname from users_task12 where id=? and status=1;";
        values = [req.id]
        result = await executeQueryselect("combinedTask", query, values);
        res.render('./(t3)kuku-kube/kuku-kube.ejs', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
    catch (err) {
        res.redirect('/error');
    }
}
module.exports = t3_kuku_kube;