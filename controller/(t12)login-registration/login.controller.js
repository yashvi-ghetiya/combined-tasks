var md5 = require('md5');
const jwt = require('jsonwebtoken');
const { executeselectQuery} = require('../../database_functions/executeQuery');

const login_get = (req, res) => {
   res.render('./(t12)login-registration/html/login.ejs');
}

const login_post =  async (req, res) => {
   var result = null;
   if (req.body['email'] != '') {
      result = await executeselectQuery('combinedTask', `select * from users_task12 where email='${req.body['email']}' and status=1;`);
   }
   if (req.body['mobile'] != '') {
      result = await executeselectQuery('combinedTask', `select * from users_task12 where contact='${req.body['mobile']}' and status=1;`);
   }

   if (result.length == 1) {
      var password = md5(req.body['password'] + result[0]['password_salt']);
      if (password == result[0]['password']) {

         const token = jwt.sign({ userId: result[0]['id'] }, process.env.token_secret_key);
         res.cookie("token",token,{expireIn:"1h"});
         
         res.send({userAccess: true });
      }
      else {
         res.send({ err: "Incorrect Username or Password", userAccess: false });
      }

   }
   else {
      res.send({ err: "Incorrect Username or Password", userAccess: false });
   }
}

module.exports = {login_get,login_post};