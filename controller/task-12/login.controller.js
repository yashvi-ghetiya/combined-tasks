var md5 = require('md5');
const jwt = require('jsonwebtoken');
const { executeselectQuery} = require('../../database_functions/executeQuery');
const login = require("express").Router();

login.get("/dashboard/task-12/login", (req, res) => {
   res.render('./task-12/html/login.ejs');
});

login.post("/dashboard/task-12/login", async (req, res) => {
   var result = null;
   if (req.body['email'] != '') {
      result = await executeselectQuery('registration', `select * from users where email='${req.body['email']}' and status=1;`);
   }
   if (req.body['mobile'] != '') {
      result = await executeselectQuery('registration', `select * from users where contact='${req.body['mobile']} and status=1';`);
   }

   if (result.length == 1) {
      var password = md5(req.body['password'] + result[0]['password_salt']);
      if (password == result[0]['password']) {

         const token = jwt.sign({ userId: result[0]['id'] }, process.env.token_secret_key, {
            expiresIn: '1h',
         });
         
         res.send({ token: token, userAccess: true });
      }
      else {
         res.send({ err: "Incorrect Username or Password", userAccess: false });
      }

   }
   else {
      res.send({ err: "Incorrect Username or Password", userAccess: false });
   }

})

module.exports = login;