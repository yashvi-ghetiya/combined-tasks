const json_placeholder_fetch_api = require("express").Router();
const { authentication,getUserId  } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');
json_placeholder_fetch_api.get("/dashboard/task-10/display",async (req, res) => {
    if(await authentication(req))
    {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
    res.render('./task-10/html/displayAll',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname']});
    }
    else
    {
        res.redirect('/task-12/login');
    }
});

json_placeholder_fetch_api.get('/dashboard/task-10/display/:id',async function (req, res) { 
    if(await authentication(req))
    {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
       
    res.render('./task-10/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname']});
    }
    else
    {
        res.redirect('/task-12/login');
    }
 });

module.exports = json_placeholder_fetch_api;