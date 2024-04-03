
const { authentication,getUserId  } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');

const t10_display = async (req, res) => {
    if(await authentication(req))
    {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
    res.render('./(t10)json-placeholder-fetch-api/html/displayAll',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname']});
    }
    else
    {
        res.redirect('/login');
    }
};

const t10_display_by_id = async function (req, res) { 
    if(await authentication(req))
    {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
       
    res.render('./(t10)json-placeholder-fetch-api/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname']});
    }
    else
    {
        res.redirect('/login');
    }
};

module.exports = {t10_display,t10_display_by_id};