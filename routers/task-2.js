
const tic_tac_toe = require("../controller/task-2/tic-tac-toe");

const task_2 = (app) => {
   app.use(tic_tac_toe);
}

module.exports = task_2;