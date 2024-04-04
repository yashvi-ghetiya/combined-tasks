let crypto = require('crypto');
const { executeQueryupdate } = require('../../database_functions/executeQuery');

const activate_code =  async function (req, res) {
    
    let activationcode = crypto.randomBytes(32).toString('hex').slice(0, 12);
    let curdate = new Date();
    curdate = `${curdate.toISOString().replace('T', ' ').split(' ')[0]} ${curdate.getHours()}:${curdate.getMinutes()}:${curdate.getSeconds()}:${curdate.getMilliseconds()}`;
    try{
        let query = `update users_task12 set activation_code=?,activate_code_update=? where activation_code=?`;
        values=[activationcode,curdate,req.body['data']]
        executeQueryupdate('combinedTask',query,values);
    // let res1 = await executeQueryUpdate_simpleQuery('combinedTask', );
}
catch (err) {
    res.redirect('/error');
}
    res.send({ message: "Link Activated\n\nEnter Password to Activate Account", activationcode: activationcode });
 };

 module.exports=activate_code;
 