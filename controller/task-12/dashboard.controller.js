const { authentication,getUserId } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');
const dashboard = require("express").Router();

dashboard.get('/dashboard', async function (req, res) {
    console.log(await authentication(req));
    if(await authentication(req))
    {
       
      var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        
        res.render('./task-12/html/dashboard',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname']});
    }
    else
    {
        
        res.redirect('/task-12/login');
    }
});
module.exports = dashboard;