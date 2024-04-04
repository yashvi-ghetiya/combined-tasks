

const { executeselectQuery} = require('../../database_functions/executeQuery');

const fetch_users_by_code  =async function (req, res) {
   try{
   let result = await executeselectQuery('combinedTask', `select * from users_task12 where activation_code='${req.params.code}';`);
   res.send({ result });
}
catch (err) {
    res.redirect('/error');
}
}

const fetch_users_by_email_contact = async function (req, res) {
   try{
   let result = await executeselectQuery('combinedTask', `select count(*) from users_task12 where email='${req.params.email}' or contact='${req.params.contact}';`);
   res.send({ result });
}
catch (err) {
    res.redirect('/error');
}
};

module.exports = {fetch_users_by_code,fetch_users_by_email_contact};