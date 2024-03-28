
const tic_tac_toe = require("express").Router();
const { authentication ,getUserId } = require("../../functions/authentication");
tic_tac_toe.get("/dashboard/task-2/tic-tac-toe", (req, res) => {
   if (authentication(req)) {
      res.render('./task-2/tic-tac-toe.ejs',{userId:getUserId(req)});
   }
   else
    {
        res.render('./task-12/html/login');
    }
});

module.exports = tic_tac_toe;