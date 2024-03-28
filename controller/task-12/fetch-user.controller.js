
const fetchUser = require("express").Router();
const { executeselectQuery} = require('../../database_functions/executeQuery');

fetchUser.get('/task-12/fetch-users/:code', async function (req, res) {
   var result = await executeselectQuery('combinedTask', `select * from users_task12 where activation_code='${req.params.code}';`);
   res.send({ result });
});


fetchUser.get('/task-12/fetch-users/:email/:contact', async function (req, res) {
   var result = await executeselectQuery('combinedTask', `select count(*) from users_task12 where email='${req.params.email}' or contact='${req.params.contact}';`);
   res.send({ result });
});

module.exports = fetchUser;