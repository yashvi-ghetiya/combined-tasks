const { executeQuery } = require('../../database_functions/executeQuery');
const t1_dynamictable = async (req, res) => {
    try{
        result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
        res.render('./(t1)dynamic_tabl/dynamictable.ejs', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
    catch(err){
        res.redirect('/error');
    }
}
module.exports = t1_dynamictable;