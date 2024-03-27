const display_student_result = require("../controller/task-5/display-students-result");

const task_5 = (app) => {
   app.use(display_student_result);
}

module.exports = task_5;