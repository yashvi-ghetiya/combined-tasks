let md5 = require('md5');
const jwt = require('jsonwebtoken');
const { executeselectQuery } = require('../../database_functions/executeQuery');

const login_get = (req, res) => {
   res.render('./(t12)login-registration/html/login.ejs');
}

const login_post = async (req, res) => {
   let result = null;
   if (req.body['email'] != '') {
      try {
         result = await executeselectQuery('combinedTask', `select * from users_task12 where email='${req.body['email']}' and status=1;`);
         console.log("jj")
         console.log(result);
      }
      catch (err) {
         res.redirect('/error');
      }
   }
   if (req.body['mobile'] != '') {
      try {
         result = await executeselectQuery('combinedTask', `select * from users_task12 where contact='${req.body['mobile']}' and status=1;`);
      }
      catch (err) {
         res.redirect('/error');
      }
   }

   if (result.length == 1) {
      let password = md5(req.body['password'] + result[0]['password_salt']);
      if (password == result[0]['password']) {
         try {
            const token = jwt.sign({ userId: result[0]['id'] }, process.env.token_secret_key);
            res.cookie("token", token, { expireIn: "1h" });
            console.log(token)
            res.send({ userAccess: true });
         }
         catch (err) {
            res.redirect('/error');
         }
      }
      else {
         res.send({ err: "Incorrect Username or Password", userAccess: false });
      }

   }
   else {
      res.send({ err: "Incorrect Username or Password", userAccess: false });
   }
}

module.exports = { login_get, login_post };