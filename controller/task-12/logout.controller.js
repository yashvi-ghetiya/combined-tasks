
const logout = require("express").Router();

logout.get("/task-12/logout", (req, res) => {
   res.clearCookie('token');
   res.redirect('/task-12/login');
});

module.exports = logout;