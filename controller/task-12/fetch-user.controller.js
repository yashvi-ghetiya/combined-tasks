
const fetchUser = require("express").Router();
const { executeselectQuery} = require('../../database_functions/executeQuery');

fetchUser.get('/dashboard/task-12/fetch-users/:code', async function (req, res) {
   var result = await executeselectQuery('registration', `select * from users where activation_code='${req.params.code}';`);
   res.send({ result });
});


fetchUser.get('/dashboard/task-12/fetch-users/:email/:contact', async function (req, res) {
   var result = await executeselectQuery('registration', `select count(*) from users where email='${req.params.email}' or contact='${req.params.contact}';`);
   res.send({ result });
});

module.exports = fetchUser;