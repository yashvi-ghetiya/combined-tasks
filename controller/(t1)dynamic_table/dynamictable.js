const { executeQueryselect } = require('../../database_functions/executeQuery');
const t1_dynamictable = async (req, res) => {
    try{
        query = "select firstname,lastname from users_task12 where id=? and status=1;";
        values = [req.id]
        result = await executeQueryselect("combinedTask", query, values);
        res.render('./(t1)dynamic_table/dynamictable.ejs', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
    catch(err){
        res.redirect('/error');
    }
}
module.exports = t1_dynamictable;