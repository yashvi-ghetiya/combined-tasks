let mysql = require('mysql');
const { executeQueryselect } = require('../../database_functions/executeQuery');

let t6_display = async (req, res) => {
  let query, values, result,result1;
 
    query = "select firstname,lastname from users_task12 where id=? and status=1;";
    values = [req.id];
    try{
    result = await executeQueryselect("combinedTask", query, values);
  }
  catch (err) {
    res.redirect('/error');
  }
    let startoffset, total = 10, totalpages;
    if (req.query["page"] == undefined) {
      startoffset = 0;
    }
    else {
      startoffset = (Number(req.query["page"]) * total) - total;
    }

    query = "SELECT count(*) as totalrows FROM student_master_task2;";
    values = [];
    try{
     result1 = await executeQueryselect("combinedTask", query, values);
  }
  catch (err) {
    res.redirect('/error');
  }

      totalpages = (result1[0].totalrows) / total;
      if (Number(req.query["page"]) > totalpages || Number(req.query["page"]) <= 0) {
        res.render("./general-error/error.ejs");
      }
      else {
        let month, year;
        if (req.query['months'] == "" || req.query['months'] == undefined || req.query['years'] == "" || req.query['years'] == undefined) {
          month = 1;
          year = 2024;
        }
        else {
          month = req.query["months"];
          year = req.query["years"];
        }

        if ((req.query["orderby"] == "" || req.query["ordertype"] == "" || req.query["orderby"] == undefined || req.query["ordertype"] == undefined)) {
          query = "select student_master_task2.sid,student_master_task2.fname,student_master_task2.lname, count(atId) as presentdays,concat(ROUND((count(atId)/0.3),2),'%') from student_master_task2 inner join attendance_master_task2 on student_master_task2.sid=attendance_master_task2.sid  where attend='1' and month(day)=" + month + " and year(day)=" + year + " group by student_master_task2.sid LIMIT ?,?;";
          values = [startoffset,total];
          try{
           result1 = await executeQueryselect("combinedTask", query, values);
          }
          catch (err) {
            res.redirect('/error');
          }
            if (req.query["page"] == undefined) {
              res.render("./(t6)stduent-attendance/display", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: 1, result: result1, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
            }
            else {

              res.render("./(t6)stduent-attendance/display", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: req.query["page"], result: result1, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
            }
        
        }
        else {
          query = "select student_master_task2.sid,student_master_task2.fname,student_master_task2.lname, count(atId) as presentdays,(count(atId)/0.3) from student_master_task2 inner join attendance_master_task2 on student_master_task2.sid=attendance_master_task2.sid  where attend='1' and month(day)=" + month + " and year(day)=" + year + " group by student_master_task2.sid LIMIT ?,?";
         
          try{
          result1 = await executeQueryselect("combinedTask", query, values);
        }
        catch (err) {
          res.redirect('/error');
        }
            if (req.query["page"] == undefined) {

              res.render("./(t6)stduent-attendance/display", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: 1, result: result1, totalpages: totalpages, orderby: req.query["orderby"], ordertype: req.query["ordertype"], month: month, year: year });
            }
            else {
              res.render("./(t6)stduent-attendance/display", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: req.query["page"], result: result1, totalpages: totalpages, orderby: req.query["orderby"], ordertype: req.query["ordertype"], month: month, year: year });
            }
          }
      }
};

module.exports = t6_display;