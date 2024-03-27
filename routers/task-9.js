const searching_by_delimiter = require("../controller/task-9/searching-by-delimiter");

const task_9 = (app) => {
   app.use(searching_by_delimiter);
}

module.exports = task_9;