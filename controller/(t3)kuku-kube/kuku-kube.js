
const { authentication,getUserId  } = require("../../functions/authentication");
const { executeQuery} = require('../../database_functions/executeQuery');

const t3_kuku_kube = async (req, res, next) => {
    if (await authentication(req)) {
        result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        res.render('./(t3)kuku-kube/kuku-kube.ejs',{firstname:result[0]['firstname'],lastname:result[0]['lastname']});
       }
       else
        {
            res.redirect('/login');
        }
}


module.exports = t3_kuku_kube;