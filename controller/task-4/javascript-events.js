
const javascript_events = require("express").Router();
const { authentication,getUserId  } = require("../../functions/authentication");
javascript_events.get("/dashboard/task-4/javascript-events", (req, res) => {
   if(authentication(req))
   {
   res.render('./task-4/javascript-events.ejs',{userId:getUserId(req)});
   }
   else
    {
        res.render('./task-12/html/login');
    }
});

module.exports = javascript_events;