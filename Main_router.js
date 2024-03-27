
const task_1 = require("./routers/task-1");
const task_2 = require("./routers/task-2");
const task_3 = require("./routers/task-3");
const task_4 = require("./routers/task-4");

const routers = (app) => {
   task_1(app);
   task_2(app);
   task_3(app);
   task_4(app);
}

module.exports = routers;