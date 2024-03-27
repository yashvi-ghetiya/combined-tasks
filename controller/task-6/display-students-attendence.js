const result = require("express").Router();
var mysql = require('mysql');

result.get("/dashboard/task-6/display", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student27_02_2024"
  });
  con.connect(function (err) {
    if (err) throw err;
    var startoffset, total = 10, totalpages;
    if (req.query["page"] == undefined) {
      startoffset = 0;
    }
    else {
      startoffset = (Number(req.query["page"]) * total) - total;
    }

    con.query("SELECT count(*) as totalrows FROM studentmaster;", function (err, result, fields) {
      if (err) throw err;

      totalpages = (result[0].totalrows) / total;
      if (Number(req.query["page"]) > totalpages || Number(req.query["page"]) <= 0) {
        res.render("./general-error/error.ejs");
      }
      else {
        var month, year;
        if (req.query['months'] == "" || req.query['months'] == undefined || req.query['years'] == "" || req.query['years'] == undefined) {
          month = 1;
          year = 2024;
        }
        else {
          month = req.query["months"];
          year = req.query["years"];
        }

        if ((req.query["orderby"] == "" || req.query["ordertype"] == "" || req.query["orderby"] == undefined || req.query["ordertype"] == undefined)) {
          con.query("select studentmaster.sid,studentmaster.fname,studentmaster.lname, count(atId) as presentdays,concat(ROUND((count(atId)/0.3),2),'%') from studentmaster inner join attendancemaster on studentmaster.sid=attendancemaster.sid  where attend='1' and month(day)=" + month + " and year(day)=" + year + " group by studentmaster.sid LIMIT " + startoffset + "," + total + ";", function (err, result, fields) {
            if (err) throw err;
            if (req.query["page"] == undefined) {
              res.render("./task-6/display", { page: 1, result: result, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
            }
            else {

              res.render("./task-6/display", { page: req.query["page"], result: result, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
            }
          });
        }
        else {

          con.query("select studentmaster.sid,studentmaster.fname,studentmaster.lname, count(atId) as presentdays,(count(atId)/0.3) from studentmaster inner join attendancemaster on studentmaster.sid=attendancemaster.sid  where attend='1' and month(day)=" + month + " and year(day)=" + year + " group by studentmaster.sid LIMIT " + startoffset + "," + total + ";", function (err, result, fields) {
            if (err) throw err;
            if (req.query["page"] == undefined) {

              res.render("./task-6/display", { page: 1, result: result, totalpages: totalpages, orderby: req.query["orderby"], ordertype: req.query["ordertype"], month: month, year: year });
            }
            else {
              res.render("./task-6/display", { page: req.query["page"], result: result, totalpages: totalpages, orderby: req.query["orderby"], ordertype: req.query["ordertype"], month: month, year: year });
            }
          });
        }
      }
    });
  });
});



module.exports = result;