
const tic_tac_toe = require("express").Router();
const { authentication ,getUserId } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');
tic_tac_toe.get("/dashboard/task-2/tic-tac-toe", async(req, res) => {
   if (authentication(req)) {
    result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
    res.render('./task-2/tic-tac-toe.ejs',{firstname:result[0]['firstname'],lastname:result[0]['lastname']});
   }
   else
    {
        res.redirect('/task-12/login');
    }
});

module.exports = tic_tac_toe;