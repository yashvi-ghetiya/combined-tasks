const registration = require("express").Router();

registration.get("/dashboard/task-12/registration", (req, res) => {
    res.render('./task-12/html/registration.ejs');
})

module.exports = registration;