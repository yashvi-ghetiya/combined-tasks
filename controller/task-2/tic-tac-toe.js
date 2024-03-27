
const tic_tac_toe = require("express").Router();

tic_tac_toe.get("/dashboard/task-2/tic-tac-toe", (req, res) => {
   res.render('./task-2/tic-tac-toe.ejs');
});

module.exports = tic_tac_toe;