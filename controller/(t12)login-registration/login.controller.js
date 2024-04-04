let md5 = require('md5');
const jwt = require('jsonwebtoken');
const { executeQueryselect } = require('../../database_functions/executeQuery');

const login_get = (req, res) => {
   res.render('./(t12)login-registration/html/login.ejs');
}

const login_post = async (req, res) => {
   let result = null;
   if (req.body['email'] != '') {
      try {
         let query= `select * from users_task12 where email=? and status=1;`
         let values=[req.body['email']];
         result = await executeQueryselect('combinedTask',query,values);
         
      }
      catch (err) {
         res.redirect('/error');
      }
   }
   if (req.body['mobile'] != '') {
      try {
         let query= `select * from users_task12 where contact=? and status=1;`
         let values=[req.body['mobile']];
         result = await executeQueryselect('combinedTask',query,values);
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