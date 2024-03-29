const login = require("../controller/task-12/login.controller");
const registration = require("../controller/task-12/registration.controller");
const fetchUser = require("../controller/task-12/fetch-user.controller");
const dashboard = require("../controller/task-12/dashboard.controller");
const insertUser = require("../controller/task-12/insert-user.controller");
const userVerification = require("../controller/task-12/user-verfication.controller");
const updatePassword = require("../controller/task-12/update-password.controller");
const activateCode = require("../controller/task-12/activate-code.controller");
const activateUser = require("../controller/task-12/activate-users.controller");
const logout = require("../controller/task-12/logout.controller");

const task_12 = (app) => {
   app.use(login);
   app.use(registration);
   app.use(fetchUser);
   app.use(dashboard);
   app.use(insertUser);
   app.use(userVerification);
   app.use(updatePassword);
   app.use(activateUser);
   app.use(activateCode);
   app.use(logout);
}

module.exports = task_12;