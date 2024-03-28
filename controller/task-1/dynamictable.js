
const dynamictable = require("express").Router();
const { authentication,getUserId } = require("../../functions/authentication");
dynamictable.get("/dashboard/task-1/dynamictable", (req, res) => {
   if(authentication(req))
    {
        console.log(getUserId(req));
        res.render('./task-1/dynamictable.ejs',{userId:getUserId(req)});
    }
    else
    {
        res.render('./task-12/html/login');
    }
});

module.exports = dynamictable;