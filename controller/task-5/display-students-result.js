const result = require("express").Router();
var mysql = require('mysql');

result.get("/dashboard/task-5/display", (req, res) => {

   var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "studentMaster"
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
  
      con.query("SELECT count(*) as totalrows FROM student_master;", function (err, result, fields) {
        if (err) throw err;
  
        totalpages = Math.ceil((result[0].totalrows) / total);
        
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
            con.query(`SELECT student_master.sid as sid,
            student_master.fname,
            SUM(CASE
                WHEN exam_master.emId = 1
                  THEN exam_result.obtainedmarks
                  ELSE 0 END) as "terminalpractical",
            SUM(CASE
                WHEN exam_master.emId = 2
                  THEN exam_result.obtainedmarks
                  ELSE 0 END) as "terminaltheory",
            SUM(CASE
                WHEN exam_master.emId = 3
                  THEN exam_result.obtainedmarks
                  ELSE 0 END) as "finalpractical",
            SUM(CASE
                WHEN exam_master.emId = 4
                  THEN exam_result.obtainedmarks
                  ELSE 0 END) as "finaltheory",
            SUM(CASE
                WHEN exam_master.emId = 5
                  THEN exam_result.obtainedmarks
                  ELSE 0 END) as "preliminarypractical",
            SUM(CASE
                WHEN exam_master.emId = 6
                  THEN exam_result.obtainedmarks
                  ELSE 0 END) as "preliminarytheory",
            SUM(exam_result.obtainedmarks) as "total"
            FROM student_master 
            left join exam_result on student_master.sid=exam_result.sid 
            left join exam_master on exam_master.emId=exam_result.examtype
            group by student_master.sid `+" LIMIT " + startoffset + "," + total + ";", function (err, result, fields) {
              if (err) throw err;
              if (req.query["page"] == undefined) {
                res.render("./task-5/display", { page: 1, result: result, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
              }
              else {
  
                res.render("./task-5/display", { page: req.query["page"], result: result, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
              }
  
            });
        }
      });
    });
});

result.get('/dashboard/task-5/displayspecific', async(req, res) => {
   var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "root",
     database: "studentMaster"
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
 
     con.query("SELECT count(*) as totalrows FROM student_master;", function (err, result, fields) {
       if (err) throw err;
 
       totalpages = Math.ceil((result[0].totalrows) / total);
       console.log(totalpages);
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
           con.query("select student_master.sid,student_master.fname,student_master.lname, count(atId) as presentdays,concat(ROUND((count(atId)/0.3),2),'%') as percentage from student_master inner join attendence_master on student_master.sid=attendence_master.sid  where attend='1' and student_master.sid="+req.query['id']+";", function (err, result1, fields) {
             if (err) throw err;
             const query = `SELECT student_master.sid, subject_master.subname,
             SUM(CASE
                 WHEN exam_master.emId = 1
                   THEN exam_result.obtainedmarks
                   ELSE 0 END) as "terminalpractical",
             SUM(CASE
                 WHEN exam_master.emId = 2
                   THEN exam_result.obtainedmarks
                   ELSE 0 END) as "terminaltheory",
             SUM(CASE
                 WHEN exam_master.emId = 3
                   THEN exam_result.obtainedmarks
                   ELSE 0 END) as "finalpractical",
             SUM(CASE
                 WHEN exam_master.emId = 4
                   THEN exam_result.obtainedmarks
                   ELSE 0 END) as "finaltheory",
             SUM(CASE
                 WHEN exam_master.emId = 5
                   THEN exam_result.obtainedmarks
                   ELSE 0 END) as "preliminarypractical",
             SUM(CASE
                 WHEN exam_master.emId = 6
                   THEN exam_result.obtainedmarks
                   ELSE 0 END) as "preliminarytheory",
             SUM(exam_result.obtainedmarks) as "total"
             FROM student_master 
             left join exam_result on student_master.sid=exam_result.sid 
             left join exam_master on exam_master.emId=exam_result.examtype
             left join subject_master on subject_master.subid=exam_result.subid
             where student_master.sid=? group by subject_master.subid;`;
             const values = [req.query["id"]];
             con.query(query, values, function (err, result2, fields){
               var query1=`SELECT 
               SUM(CASE
                   WHEN exam_master.emId = 1
                     THEN exam_result.obtainedmarks
                     ELSE 0 END) as "terminalpractical",
               SUM(CASE
                   WHEN exam_master.emId = 2
                     THEN exam_result.obtainedmarks
                     ELSE 0 END) as "terminaltheory",
               SUM(CASE
                   WHEN exam_master.emId = 3
                     THEN exam_result.obtainedmarks
                     ELSE 0 END) as "finalpractical",
               SUM(CASE
                   WHEN exam_master.emId = 4
                     THEN exam_result.obtainedmarks
                     ELSE 0 END) as "finaltheory",
               SUM(CASE
                   WHEN exam_master.emId = 5
                     THEN exam_result.obtainedmarks
                     ELSE 0 END) as "preliminarypractical",
               SUM(CASE
                   WHEN exam_master.emId = 6
                     THEN exam_result.obtainedmarks
                     ELSE 0 END) as "preliminarytheory",
               SUM(exam_result.obtainedmarks) as "total"
               FROM student_master 
               left join exam_result on student_master.sid=exam_result.sid 
               left join exam_master on exam_master.emId=exam_result.examtype
               where student_master.sid=?;`
               con.query(query1, values, function (err, result3, fields){
                 con.query("SELECT marks FROM studentMaster.exam_master;", function (err, result4, fields){
                   var query2 = `		SELECT 
                   SUM(CASE
                       WHEN exam_master.emId = 1
                         THEN exam_master.marks
                         ELSE 0 END) as "terminalpractical",
                   SUM(CASE
                       WHEN exam_master.emId = 2
                         THEN exam_master.marks
                         ELSE 0 END) as "terminaltheory",
                   SUM(CASE
                       WHEN exam_master.emId = 3
                         THEN exam_master.marks
                         ELSE 0 END) as "finalpractical",
                   SUM(CASE
                       WHEN exam_master.emId = 4
                         THEN exam_master.marks
                         ELSE 0 END) as "finaltheory",
                   SUM(CASE
                       WHEN exam_master.emId = 5
                         THEN exam_master.marks
                         ELSE 0 END) as "preliminarypractical",
                   SUM(CASE
                       WHEN exam_master.emId = 6
                         THEN exam_master.marks
                         ELSE 0 END) as "preliminarytheory",
                   SUM(exam_master.marks) as "total"
                   FROM student_master 
                   left join exam_result on student_master.sid=exam_result.sid 
                   left join exam_master on exam_master.emId=exam_result.examtype
                   where student_master.sid=?`;
                   con.query(query2, values, function (err, result5, fields){
                     var query3=`		SELECT 
                     SUM(CASE
                         WHEN exam_master.emtype1="terminal"
                           THEN exam_result.obtainedmarks
                           ELSE 0 END) as "terminal",
                     SUM(CASE
                         WHEN exam_master.emtype1="preliminary"
                           THEN exam_result.obtainedmarks
                           ELSE 0 END) as "preliminary",
                     SUM(CASE
                         WHEN exam_master.emtype1="final"
                           THEN exam_result.obtainedmarks
                           ELSE 0 END) as "final",
                     SUM(CASE
                                 WHEN exam_master.emtype1="final"
                                   THEN exam_master.marks
                                   ELSE 0 END) as "final1",
                     SUM(CASE
                                 WHEN exam_master.emtype1="terminal"
                                   THEN exam_master.marks
                                   ELSE 0 END) as "terminal1",
                     SUM(CASE
                                 WHEN exam_master.emtype1="preliminary"
                                   THEN exam_master.marks
                                   ELSE 0 END) as "preliminary1",
                     SUM(exam_result.obtainedmarks) as "total",
                     SUM(exam_master.marks) as "total1",
                     concat(ROUND(SUM(exam_result.obtainedmarks)/SUM(exam_master.marks/100),2),'%') as "percentage"
                     FROM student_master 
                     left join exam_result on student_master.sid=exam_result.sid 
                     left join exam_master on exam_master.emId=exam_result.examtype
                     where student_master.sid=?`;
                     con.query(query3, values, function (err, result6, fields){
                       var query4=`SELECT exam_result.sid, subject_master.subname,
                       sum(CASE
                           WHEN exam_result.examtype=1 and exam_result.attend=1
                             THEN 1
                             ELSE 0 END) as "terminalpractical",
                 sum(CASE
                           WHEN exam_result.examtype=2 and exam_result.attend=1
                             THEN 1
                             ELSE 0 END) as "terminaltheory",
                 sum(CASE
                           WHEN exam_result.examtype=3 and exam_result.attend=1
                             THEN 1
                             ELSE 0 END) as "preliminarypractical",
                sum(CASE
                           WHEN exam_result.examtype=4 and exam_result.attend=1
                             THEN 1
                             ELSE 0 END) as "preliminarytheory",
                sum(CASE
                           WHEN exam_result.examtype=5 and exam_result.attend=1
                             THEN 1
                             ELSE 0 END) as "finalpractical",
                sum(CASE
                           WHEN exam_result.examtype=6 and exam_result.attend=1
                             THEN 1
                             ELSE 0 END) as "finaltheory"
                       FROM exam_result 
                       left join exam_master on exam_master.emId=exam_result.examtype
                       left join subject_master on subject_master.subid=exam_result.subid
                       where exam_result.sid=? group by subject_master.subid;`;
                       con.query(query4, values, function (err, result7, fields){
                         console.log(result7[0])
                         res.render("./task-5/displayspecific", { page: req.query["page"], result1 : result1,result2 : result2,result3 : result3,result4 : result4,result5 : result5,result6 : result6,result7 : result7});
 
                       });
                     });
                   });
                 });
               });
             });
           });
       }
     });
   });
 });

module.exports = result;