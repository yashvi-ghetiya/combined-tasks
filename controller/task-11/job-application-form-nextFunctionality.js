const job_application_form_nextFunctionality = require("express").Router();

const { executeQueryInsert,executeQueryselect } = require('../../database_functions/executeQuery');
const { updateData } = require('../../functions/updatefile');

job_application_form_nextFunctionality.get("/dashboard/task-11/insert", async (req, res) => {
    res.render('./task-11/html/form.ejs', { submitype: "insert" });
});

job_application_form_nextFunctionality.get('/dashboard/task-11/display', async function (req, res) {
    res.render('./task-11/html/display');
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch/:id', async function (req, res) {

    var query = "SELECT * from candidateMaster where canid = ? ;";
    var values = [req.params.id]
    var can = await executeQueryselect("job_app_db_15March", query, values);


    query = "SELECT * from educationDetails where canid = ? ;";
    values = [req.params.id]
    var edu = await executeQueryselect("job_app_db_15March", query, values);


    query = "SELECT * from languageKnown where canid = ? ;";
    values = [req.params.id]
    var lang = await executeQueryselect("job_app_db_15March", query, values);

    query = "SELECT * from preference where canid = ? ;";
    values = [req.params.id]
    var pref = await executeQueryselect("job_app_db_15March", query, values);

    query = "SELECT * from referenceContact where canid = ? ;";
    values = [req.params.id]
    var ref = await executeQueryselect("job_app_db_15March", query, values);

    query = "SELECT * from technologyYouKnow where canid = ? ;";
    values = [req.params.id]
    var tech = await executeQueryselect("job_app_db_15March", query, values);

    query = "SELECT * from workExperience where canid = ? ;";
    values = [req.params.id]
    var work = await executeQueryselect("job_app_db_15March", query, values);

    res.send({
        can,
        edu,
        lang,
        pref,
        ref,
        tech,
        work
    })
});

job_application_form_nextFunctionality.post('/dashboard/task-11/post-data', async function (req, res) {
    const arr = req.body;
    var result1, result2;
    result1 = await insertData("job_app_db_15March", `INSERT INTO candidateMaster 
    (fname,lname,designation,city,state,email,phoneNo,zipCode,gender,relationship,dob,add1,add2) 
    VALUES 
    ('${arr['fname']}',
    '${arr['lname']}',
    '${arr['desig']}',
    '${arr['city']}',
    '${arr['state']}',
    '${arr['email']}',
    '${arr['contact']}',
    '${arr['zipcode']}',
    '${arr['gender']}',
    '${arr['relationship']}',
    '${arr['dob']}',
    '${arr['add1']}',
    '${arr['add2']}')`);

    if (result1 == "database") {
        console.log("error in db connection");
    }
    else if (result1 == false) {
        console.log("error in basic data insertion");
    }
    else if (typeof Number(result1) == "number") {
        for (var i = 0; i < arr['edu'].length; i++) {
            if (arr['edu'][i] == '') {
                break;
            }
            result2 = await insertData("job_app_db_15March", `INSERT INTO educationDetails 
             (canid,degree,board_courseName,passingYear,percentage) 
             VALUES 
             ('${Number(result1)}',
             '${arr['degree'][i]}',
             '${arr['edu'][i]}',
             '${arr['edupassingyear'][i]}',
             '${Number(arr['eduper'][i])}')`);
        }
    }

    if (result2 == "database") {
        console.log("error in db connection");
    }
    else if (result2 == false) {
        console.log("error in edu data insertion");
    }
    else if (typeof Number(result2) == "number") {
        for (var i = 0; i < arr['company'].length; i++) {
            if (arr['company'][i] == '') {
                break;
            }

            result2 = await insertData("job_app_db_15March", `INSERT INTO workExperience 
         (canid,companyName,designation,fromDate,toDate) 
            VALUES 
            ('${Number(result1)}',
            '${arr['company'][i]}',
            '${arr['des'][i]}',
            '${arr['workfrom'][i]}',
            '${arr['workto'][i]}')`);
        }
    }

    if (result2 == "database") {
        console.log("error in db connection");
    }
    else if (result2 == false) {
        console.log("error in work data insertion");
    }
    else if (typeof Number(result2) == "number") {
        if (arr['php'] != undefined) {
            result2 = await insertData("job_app_db_15March", `INSERT INTO technologyYouKnow 
         (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'php',
            '${arr['php']}')`);
        }
        if (arr['mysql'] != undefined) {
            result2 = await insertData("job_app_db_15March", `INSERT INTO technologyYouKnow 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'mysql',
            '${arr['mysql']}')`);
        }
        if (arr['laravel'] != undefined) {
            result2 = await insertData("job_app_db_15March", `INSERT INTO technologyYouKnow 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'laravel',
            '${arr['laravel']}')`);
        }
        if (arr['oracle'] != undefined) {
            result2 = await insertData("job_app_db_15March", `INSERT INTO technologyYouKnow 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'oracle',
            '${arr['oracle']}')`);
        }
    }

    if (result2 == "database") {
        console.log("error in db connection");
    }
    else if (result2 == false) {
        console.log("error in technology data insertion");
    }
    else if (typeof Number(result2) == "number") {
        var arr1 = ['canRead', 'canWrite', 'canSpeak'];
        var arr2 = [];
        if (arr['hindi'] != undefined) {
            for (var i = 0; i < 3; i++) {
                if (arr1.includes(arr['hindi'][i])) {
                    arr2.push(1);
                }
                else {
                    arr2.push(0);
                }
            }

            result2 = await insertData("job_app_db_15March", `INSERT INTO languageKnown 
          (canid,language,canRead,canWrite,canSpeak) 
          VALUES 
          ('${Number(result1)}',
          'hindi',
          '${arr2[0]}',
          '${arr2[1]}',
          '${arr2[2]}')`);
        }
        arr2 = [];
        if (arr['english'] != undefined) {
            for (var i = 0; i < 3; i++) {
                if (arr1.includes(arr['english'][i])) {
                    arr2.push(1);
                }
                else {
                    arr2.push(0);
                }
            }

            result2 = await insertData("job_app_db_15March", `INSERT INTO languageKnown 
          (canid,language,canRead,canWrite,canSpeak) 
          VALUES 
          ('${Number(result1)}',
          'english',
          '${arr2[0]}',
          '${arr2[1]}',
          '${arr2[2]}')`);
        }
        arr2 = [];
        if (arr['gujarati'] != undefined) {
            for (var i = 0; i < 3; i++) {
                if (arr1.includes(arr['gujarati'][i])) {
                    arr2.push(1);
                }
                else {
                    arr2.push(0);
                }
            }

            result2 = await insertData("job_app_db_15March", `INSERT INTO languageKnown 
          (canid,language,canRead,canWrite,canSpeak) 
          VALUES 
          ('${Number(result1)}',
          'gujarati',
          '${arr2[0]}',
          '${arr2[1]}',
          '${arr2[2]}')`);
        }

    }

    if (result2 == "database") {
        console.log("error in db connection");
    }
    else if (result2 == false) {
        console.log("error in language data insertion");
    }
    else if (typeof Number(result2) == "number") {
        for (var i = 0; i < arr['refname'].length; i++) {
            if (arr['refname'][i] == '') {
                break;
            }
            result2 = await insertData("job_app_db_15March", `INSERT INTO referenceContact 
             (canid,name,contactNo,relation) 
             VALUES 
             ('${Number(result1)}',
             '${arr['refname'][i]}',
             '${arr['refcontact'][i]}',
             '${arr['refrel'][i]}')`);
        }
    }

    if (result2 == "database") {
        console.log("error in db connection");
    }
    else if (result2 == false) {
        console.log("error in language data insertion");
    }
    else if (typeof Number(result2) == "number") {
        result2 = await insertData("job_app_db_15March", `INSERT INTO preference 
          (canid,preferedLocation,noticePeriod,expectedCTC,currentCTC,department) 
          VALUES 
          ('${Number(result1)}',
          '${arr["preferedlocation"].toString()}',
          '${arr['noticeperiod']}',
          '${arr['expectedCTC']}',
          '${arr['currentCTC']}',
          '${arr['department']}')`);
    }

    res.json({ key: "error" });
});

job_application_form_nextFunctionality.get('/dashboard/task-11/update/:id', async function (req, res) {
    res.render('./task-11/html/form.ejs', { submitype: 'update' });
});

job_application_form_nextFunctionality.post('/dashboard/task-11/updatedata/:id', async function (req, res) {
    updateData("job_app_db_15March", req.body, req.params.id);
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch-data', async function (req, res) {
    var result = await executeQueryselect("job_app_db_15March", `SELECT canid,fname,lname from candidateMaster;`);
    res.send({ can: result });
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch-state', async function (req, res) {
    var result = await executeQueryselect("job_app_db_15March", "select id,name from states");
    res.send({ result });
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch-city/:state', async function (req, res) {
    var query = "select * from cities where state_id=" + req.params.state;
    var result = await executeQueryselect("job_app_db_15March", query);
    res.send({ result });
});

async function insertData(database, query) {
    let result = await executeQueryInsert(database, query);
    return result;
 }


module.exports = job_application_form_nextFunctionality;