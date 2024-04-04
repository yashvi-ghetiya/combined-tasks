

const { executeQueryselect} = require('../../database_functions/executeQuery');

const fetch_users_by_code  =async function (req, res) {
   try{
    let query= `select * from users_task12 where activation_code=?;`
    let values=[req.params.code];
    let result = await executeQueryselect('combinedTask',query,values);
   res.send({ result });
}
catch (err) {
    res.redirect('/error');
}
}

const fetch_users_by_email_contact = async function (req, res) {
   try{
    let query= `select count(*) from users_task12 where email=? or contact=?;`;
    let values=[req.params.email,req.params.contact];
    let result = await executeQueryselect('combinedTask',query,values);
   res.send({ result });
}
catch (err) {
    res.redirect('/error');
}
};

module.exports = {fetch_users_by_code,fetch_users_by_email_contact};