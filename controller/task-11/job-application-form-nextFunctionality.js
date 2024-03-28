const job_application_form_nextFunctionality = require("express").Router();
const { authentication,getUserId  } = require("../../functions/authentication");
const { executeQueryInsert, executeQueryselect } = require('../../database_functions/executeQuery');
const { updateData } = require('../../functions/updatefile');

job_application_form_nextFunctionality.get("/dashboard/task-11/insert", async (req, res) => {
    if (authentication(req)) {
        res.render('./task-11/html/form.ejs', { submitype: "insert",userId:getUserId(req) });
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.get('/dashboard/task-11/display', async function (req, res) {
    if (authentication(req)) {
        res.render('./task-11/html/display',{userId:getUserId(req)});
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch/:id', async function (req, res) {
    if (authentication(req)) {
        var query = "SELECT * from candidateMaster_task15 where canid = ? ;";
        var values = [req.params.id]
        var can = await executeQueryselect("combinedTask", query, values);


        query = "SELECT * from educationDetails_task15 where canid = ? ;";
        values = [req.params.id]
        var edu = await executeQueryselect("combinedTask", query, values);


        query = "SELECT * from languageKnown_task15 where canid = ? ;";
        values = [req.params.id]
        var lang = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from preference_task15 where canid = ? ;";
        values = [req.params.id]
        var pref = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from referenceContact_task15 where canid = ? ;";
        values = [req.params.id]
        var ref = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from technologyYouKnow_task15 where canid = ? ;";
        values = [req.params.id]
        var tech = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from workExperience_task15 where canid = ? ;";
        values = [req.params.id]
        var work = await executeQueryselect("combinedTask", query, values);

        res.send({
            can,
            edu,
            lang,
            pref,
            ref,
            tech,
            work
        })
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.post('/dashboard/task-11/post-data', async function (req, res) {
    if (authentication(req)) {
        const arr = req.body;
        var result1, result2;
        result1 = await insertData("combinedTask", `INSERT INTO candidateMaster_task15 
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
        console.log(result1, "insert ma");
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
                result2 = await insertData("combinedTask", `INSERT INTO educationDetails_task15 
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

                result2 = await insertData("combinedTask", `INSERT INTO workExperience_task15 
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
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
         (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'php',
            '${arr['php']}')`);
            }
            if (arr['mysql'] != undefined) {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'mysql',
            '${arr['mysql']}')`);
            }
            if (arr['laravel'] != undefined) {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'laravel',
            '${arr['laravel']}')`);
            }
            if (arr['oracle'] != undefined) {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
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

                result2 = await insertData("combinedTask", `INSERT INTO languageKnown_task15 
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

                result2 = await insertData("combinedTask", `INSERT INTO languageKnown_task15 
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

                result2 = await insertData("combinedTask", `INSERT INTO languageKnown_task15 
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
                result2 = await insertData("combinedTask", `INSERT INTO referenceContact_task15 
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
            result2 = await insertData("combinedTask", `INSERT INTO preference_task15 
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
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.get('/dashboard/task-11/update/:id', async function (req, res) {
    if (authentication(req)) { res.render('./task-11/html/form.ejs', { submitype: 'update',userId:getUserId(req) }); }
    else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.post('/dashboard/task-11/updatedata/:id', async function (req, res) {
    if (authentication(req)) {
        updateData("combinedTask", req.body, req.params.id);
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch-data', async function (req, res) {
    if (authentication(req)) {
        var result = await executeQueryselect("combinedTask", `SELECT canid,fname,lname from candidateMaster_task15;`);
        res.send({ can: result });
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch-state', async function (req, res) {
    if (authentication(req)) {
        var result = await executeQueryselect("combinedTask", "select id,name from states_task15");
        res.send({ result });
    } else {
        res.render('./task-12/html/login');
    }
});

job_application_form_nextFunctionality.get('/dashboard/task-11/fetch-city/:state', async function (req, res) {
    if (authentication(req)) {
        var query = "select * from cities_task15 where state_id=" + req.params.state;
        var result = await executeQueryselect("combinedTask", query);
        res.send({ result });
    } else {
        res.render('./task-12/html/login');
    }
});

async function insertData(database, query) {
    if (authentication(req)) {
        let result = await executeQueryInsert(database, query);
        return result;
    } else {
        res.render('./task-12/html/login');
    }
}


module.exports = job_application_form_nextFunctionality;