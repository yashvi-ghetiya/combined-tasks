const json_placeholder_fetch_api = require("express").Router();
const { authentication,getUserId  } = require("../../functions/authentication");

json_placeholder_fetch_api.get("/dashboard/task-10/display",async (req, res) => {
    if(authentication(req))
    {
    res.render('./task-10/html/displayAll',{userId:getUserId(req)});
    }
    else
    {
        res.render('./task-12/html/login');
    }
});

json_placeholder_fetch_api.get('/dashboard/task-10/display/:id',async function (req, res) { 
    if(authentication(req))
    {
        console.log(getUserId(req));
    res.render('./task-10/html/display',{userId:getUserId(req)});
    }
    else
    {
        res.render('./task-12/html/login');
    }
 });

module.exports = json_placeholder_fetch_api;