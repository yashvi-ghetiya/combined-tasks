
const javascript_events = require("express").Router();
const { authentication,getUserId  } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');
javascript_events.get("/dashboard/task-4/javascript-events", async(req, res) => {
   if(authentication(req))
   {
    result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
    res.render('./task-4/javascript-events.ejs',{firstname:result[0]['firstname'],lastname:result[0]['lastname']});
    
   }
   else
    {
        res.redirect('/task-12/login');
    }
});

module.exports = javascript_events;