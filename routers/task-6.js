const display_student_attendence = require("../controller/task-6/display-students-attendence");

const task_6 = (app) => {
   app.use(display_student_attendence);
}

module.exports = task_6;