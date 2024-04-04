let crypto = require('crypto');
const { executeQueryUpdate_simpleQuery } = require('../../database_functions/executeQuery');

const activate_code =  async function (req, res) {
    
    let activationcode = crypto.randomBytes(32).toString('hex').slice(0, 12);
    let curdate = new Date();
    curdate = `${curdate.toISOString().replace('T', ' ').split(' ')[0]} ${curdate.getHours()}:${curdate.getMinutes()}:${curdate.getSeconds()}:${curdate.getMilliseconds()}`;
    try{
    let res1 = await executeQueryUpdate_simpleQuery('combinedTask', `update users_task12 set activation_code='${activationcode}',activate_code_update='${curdate}' where activation_code='${req.body['data']}'`);
}
catch (err) {
    res.redirect('/error');
}
    res.send({ message: "Link Activated\n\nEnter Password to Activate Account", activationcode: activationcode });
 };

 module.exports=activate_code;
 