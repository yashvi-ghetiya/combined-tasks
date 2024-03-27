
const kuku_kube = require("express").Router();

kuku_kube.get("/dashboard/task-3/kuku-kube", (req, res) => {
   res.render('./task-3/kuku-kube.ejs');
});

module.exports = kuku_kube;