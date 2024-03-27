
const javascript_events = require("express").Router();

javascript_events.get("/dashboard/task-4/javascript-events", (req, res) => {
   res.render('./task-4/javascript-events.ejs');
});

module.exports = javascript_events;