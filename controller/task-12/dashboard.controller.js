const { authentication,getUserId } = require("../../functions/authentication");

const dashboard = require("express").Router();

dashboard.get('/dashboard', async function (req, res) {
    if(authentication(req))
    {
        
        res.render('./task-12/html/dashboard',{userId:getUserId(req)});
    }
    else
    {
        res.render('./task-12/html/login');
    }
    
});
module.exports = dashboard;