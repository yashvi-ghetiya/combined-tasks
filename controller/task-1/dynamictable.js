
const dynamictable = require("express").Router();
const { authentication,getUserId } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');

dynamictable.get("/dashboard/task-1/dynamictable", async(req, res) => {
   if(await authentication(req))
    {
        result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        
        res.render('./task-1/dynamictable.ejs',{firstname:result[0]['firstname'],lastname:result[0]['lastname']});
    }
    else
    {
        res.redirect('/task-12/login');
    }
});

module.exports = dynamictable;