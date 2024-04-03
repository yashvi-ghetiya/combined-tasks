

const { authentication ,getUserId } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');

const t2_tic_tac_toe = async (req, res, next) => {
    if (await authentication(req)) {
        result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        res.render('./(t2)tic-tac-toe/tic-tac-toe.ejs',{firstname:result[0]['firstname'],lastname:result[0]['lastname']});
       }
       else
        {
            res.redirect('/login');
        }
}


module.exports = t2_tic_tac_toe;