
const task_1 = require("./routers/task-1");
const task_2 = require("./routers/task-2");
const task_3 = require("./routers/task-3");
const task_4 = require("./routers/task-4");
const task_5 = require("./routers/task-5");
const task_6 = require("./routers/task-6");
const task_7 = require("./routers/task-7");

const routers = (app) => {
   task_1(app);
   task_2(app);
   task_3(app);
   task_4(app);
   task_5(app);
   task_6(app);
   task_7(app);
}

module.exports = routers;