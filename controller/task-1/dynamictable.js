
const dynamictable = require("express").Router();

dynamictable.get("/dashboard/task-1/dynamictable", (req, res) => {
   res.render('./task-1/dynamictable.ejs');
});

module.exports = dynamictable;