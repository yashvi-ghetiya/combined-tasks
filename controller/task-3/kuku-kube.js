
const kuku_kube = require("express").Router();
const { authentication,getUserId  } = require("../../functions/authentication");
kuku_kube.get("/dashboard/task-3/kuku-kube", (req, res) => {
   if (authentication(req)) {
      res.render('./task-3/kuku-kube.ejs',{userId:getUserId(req)});
   }
   else
    {
        res.render('./task-12/html/login');
    }
});

module.exports = kuku_kube;