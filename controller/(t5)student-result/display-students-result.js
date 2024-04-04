
const { executeQueryselect } = require('../../database_functions/executeQuery');

const t5_display = async (req, res) => {
  let query, values, result,result1;

  query = "select firstname,lastname from users_task12 where id=? and status=1;";
  values = [req.id]
  try {
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
  query = "SELECT count(*) as totalrows FROM student_master_task1;";
  let values1 = [];
  try {
    result1 = await executeQueryselect("combinedTask", query, values1);
  }
  catch (err) {
    res.redirect('/error');
  }
  totalpages = Math.ceil((result1[0].totalrows) / total);

  if (Number(req.query["page"]) > totalpages || Number(req.query["page"]) <= 0) {
    res.render("./general-error/error.ejs",);
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
    query = `SELECT student_master_task1.sid as sid,
      student_master_task1.fname,
      SUM(CASE
          WHEN exam_master_task1.emId = 1
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "terminalpractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 2
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "terminaltheory",
      SUM(CASE
          WHEN exam_master_task1.emId = 3
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "finalpractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 4
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "finaltheory",
      SUM(CASE
          WHEN exam_master_task1.emId = 5
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "preliminarypractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 6
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "preliminarytheory",
      SUM(exam_result_task1.obtainedmarks) as "total"
      FROM student_master_task1 
      left join exam_result_task1 on student_master_task1.sid=exam_result_task1.sid 
      left join exam_master_task1 on exam_master_task1.emId=exam_result_task1.examtype
      group by student_master_task1.sid LIMIT ?,?;`;
    values1 = [startoffset, total];
    try {
      result1 = await executeQueryselect("combinedTask", query, values1);
    }
    catch (err) {
      res.redirect('/error');
    }
    if (req.query["page"] == undefined) {
      res.render("./(t5)student-result/display", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: 1, result: result1, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
    }
    else {
      res.render("./(t5)student-result/display", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: req.query["page"], result: result1, totalpages: totalpages, orderby: undefined, ordertype: undefined, month: month, year: year });
    }
  }

};

const t5_displayspecific = async (req, res) => {
  let query, values, result;

  query = "select firstname,lastname from users_task12 where id=? and status=1;";
  values = [req.id]
  try {
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

  query = "SELECT count(*) as totalrows FROM student_master_task1;";
  let values1 = [], result1, result2, result3, result4, result5, result6, result7;
  try {
    result1 = await executeQueryselect("combinedTask", query, values1);
  }
  catch (err) {
    res.redirect('/error');
  }
  totalpages = Math.ceil((result1[0].totalrows) / total);

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

    try {
      query = "select student_master_task1.sid,student_master_task1.fname,student_master_task1.lname, count(atId) as presentdays,concat(ROUND((count(atId)/0.3),2),'%') as percentage from student_master_task1 inner join attendence_master_task1 on student_master_task1.sid=attendence_master_task1.sid  where attend='1' and student_master_task1.sid=?;";
      values1 = [req.query['id']];

      result1 = await executeQueryselect("combinedTask", query, values1);

      query = `SELECT student_master_task1.sid, subject_master_task1.subname,
       SUM(CASE
           WHEN exam_master_task1.emId = 1
             THEN exam_result_task1.obtainedmarks
             ELSE 0 END) as "terminalpractical",
       SUM(CASE
           WHEN exam_master_task1.emId = 2
             THEN exam_result_task1.obtainedmarks
             ELSE 0 END) as "terminaltheory",
       SUM(CASE
           WHEN exam_master_task1.emId = 3
             THEN exam_result_task1.obtainedmarks
             ELSE 0 END) as "finalpractical",
       SUM(CASE
           WHEN exam_master_task1.emId = 4
             THEN exam_result_task1.obtainedmarks
             ELSE 0 END) as "finaltheory",
       SUM(CASE
           WHEN exam_master_task1.emId = 5
             THEN exam_result_task1.obtainedmarks
             ELSE 0 END) as "preliminarypractical",
       SUM(CASE
           WHEN exam_master_task1.emId = 6
             THEN exam_result_task1.obtainedmarks
             ELSE 0 END) as "preliminarytheory",
       SUM(exam_result_task1.obtainedmarks) as "total"
       FROM student_master_task1 
       left join exam_result_task1 on student_master_task1.sid=exam_result_task1.sid 
       left join exam_master_task1 on exam_master_task1.emId=exam_result_task1.examtype
       left join subject_master_task1 on subject_master_task1.subid=exam_result_task1.subid
       where student_master_task1.sid=? group by subject_master_task1.subid;`;

      let result2 = await executeQueryselect("combinedTask", query, values1);


      query = `SELECT 
      SUM(CASE
          WHEN exam_master_task1.emId = 1
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "terminalpractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 2
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "terminaltheory",
      SUM(CASE
          WHEN exam_master_task1.emId = 3
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "finalpractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 4
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "finaltheory",
      SUM(CASE
          WHEN exam_master_task1.emId = 5
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "preliminarypractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 6
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "preliminarytheory",
      SUM(exam_result_task1.obtainedmarks) as "total"
      FROM student_master_task1 
      left join exam_result_task1 on student_master_task1.sid=exam_result_task1.sid 
      left join exam_master_task1 on exam_master_task1.emId=exam_result_task1.examtype
      where student_master_task1.sid=?;`
      let result3 = await executeQueryselect("combinedTask", query, values1);

      query = "SELECT marks FROM combinedTask.exam_master_task1;"
      let result4 = await executeQueryselect("combinedTask", query, values1);

      query = `		SELECT 
      SUM(CASE
          WHEN exam_master_task1.emId = 1
            THEN exam_master_task1.marks
            ELSE 0 END) as "terminalpractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 2
            THEN exam_master_task1.marks
            ELSE 0 END) as "terminaltheory",
      SUM(CASE
          WHEN exam_master_task1.emId = 3
            THEN exam_master_task1.marks
            ELSE 0 END) as "finalpractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 4
            THEN exam_master_task1.marks
            ELSE 0 END) as "finaltheory",
      SUM(CASE
          WHEN exam_master_task1.emId = 5
            THEN exam_master_task1.marks
            ELSE 0 END) as "preliminarypractical",
      SUM(CASE
          WHEN exam_master_task1.emId = 6
            THEN exam_master_task1.marks
            ELSE 0 END) as "preliminarytheory",
      SUM(exam_master_task1.marks) as "total"
      FROM student_master_task1 
      left join exam_result_task1 on student_master_task1.sid=exam_result_task1.sid 
      left join exam_master_task1 on exam_master_task1.emId=exam_result_task1.examtype
      where student_master_task1.sid=?`;
      let result5 = await executeQueryselect("combinedTask", query, values1);

      query = `		SELECT 
      SUM(CASE
          WHEN exam_master_task1.emtype1="terminal"
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "terminal",
      SUM(CASE
          WHEN exam_master_task1.emtype1="preliminary"
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "preliminary",
      SUM(CASE
          WHEN exam_master_task1.emtype1="final"
            THEN exam_result_task1.obtainedmarks
            ELSE 0 END) as "final",
      SUM(CASE
                  WHEN exam_master_task1.emtype1="final"
                    THEN exam_master_task1.marks
                    ELSE 0 END) as "final1",
      SUM(CASE
                  WHEN exam_master_task1.emtype1="terminal"
                    THEN exam_master_task1.marks
                    ELSE 0 END) as "terminal1",
      SUM(CASE
                  WHEN exam_master_task1.emtype1="preliminary"
                    THEN exam_master_task1.marks
                    ELSE 0 END) as "preliminary1",
      SUM(exam_result_task1.obtainedmarks) as "total",
      SUM(exam_master_task1.marks) as "total1",
      concat(ROUND(SUM(exam_result_task1.obtainedmarks)/SUM(exam_master_task1.marks/100),2),'%') as "percentage"
      FROM student_master_task1 
      left join exam_result_task1 on student_master_task1.sid=exam_result_task1.sid 
      left join exam_master_task1 on exam_master_task1.emId=exam_result_task1.examtype
      where student_master_task1.sid=?`;
      let result6 = await executeQueryselect("combinedTask", query, values1);

      query = `SELECT exam_result_task1.sid, subject_master_task1.subname,
      sum(CASE
          WHEN exam_result_task1.examtype=1 and exam_result_task1.attend=1
            THEN 1
            ELSE 0 END) as "terminalpractical",
sum(CASE
          WHEN exam_result_task1.examtype=2 and exam_result_task1.attend=1
            THEN 1
            ELSE 0 END) as "terminaltheory",
sum(CASE
          WHEN exam_result_task1.examtype=3 and exam_result_task1.attend=1
            THEN 1
            ELSE 0 END) as "preliminarypractical",
sum(CASE
          WHEN exam_result_task1.examtype=4 and exam_result_task1.attend=1
            THEN 1
            ELSE 0 END) as "preliminarytheory",
sum(CASE
          WHEN exam_result_task1.examtype=5 and exam_result_task1.attend=1
            THEN 1
            ELSE 0 END) as "finalpractical",
sum(CASE
          WHEN exam_result_task1.examtype=6 and exam_result_task1.attend=1
            THEN 1
            ELSE 0 END) as "finaltheory"
      FROM exam_result_task1 
      left join exam_master_task1 on exam_master_task1.emId=exam_result_task1.examtype
      left join subject_master_task1 on subject_master_task1.subid=exam_result_task1.subid
      where exam_result_task1.sid=? group by subject_master_task1.subid;`;
      let result7 = await executeQueryselect("combinedTask", query, values1);

      res.render("./(t5)student-result/displayspecific", { firstname: result[0]['firstname'], lastname: result[0]['lastname'], page: req.query["page"], result1: result1, result2: result2, result3: result3, result4: result4, result5: result5, result6: result6, result7: result7 });
    }
    catch (err) {
      res.redirect('/error');
    }

  }


};


module.exports = { t5_display, t5_displayspecific };