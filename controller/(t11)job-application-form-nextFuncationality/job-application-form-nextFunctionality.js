
const { authentication, getUserId } = require("../../functions/authentication");
const { executeQueryInsert, executeQueryselect, executeQuery } = require('../../database_functions/executeQuery');
const { updateData } = require('../../functions/updatefile');

const t11_insert = async (req, res) => {
    if (await authentication(req)) {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        res.render('./(t11)job-application-form-nextFuncationality/html/form.ejs', { submitype: "insert", firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    } else {
        res.redirect('/login');
    }
};

const t11_display = async function (req, res) {
    if (await authentication(req)) {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        res.render('./(t11)job-application-form-nextFuncationality/html/display', { firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    } else {
        res.redirect('/login');
    }
};

const t11_fetch_user_by_id = async function (req, res) {
    if (await authentication(req)) {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
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
        res.redirect('login');
    }
};

const t11_post_data = async function (req, res) {
    console.log("hellotttt");
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
        res.redirect('login');
    }
};

const t11_update_by_id = async function (req, res) {
    if (await authentication(req)) {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        res.render('./(t11)job-application-form-nextFuncationality/html/form.ejs', { submitype: 'update', firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    }
    else {
        res.redirect('/login');
    }
};

const t11_update_data_by_id = async function (req, res) {
    if (await authentication(req)) {
        updateData("combinedTask", req.body, req.params.id);
    } else {
        res.redirect('/login');
    }
};

const t11_fetch_data = async function (req, res) {
    if (await authentication(req)) {
        var result = await executeQueryselect("combinedTask", `SELECT canid,fname,lname from candidateMaster_task15;`);
        res.send({ can: result });
    } else {
        res.redirect('/login');
    }
};

const t11_fetch_state = async function (req, res) {
    if (await authentication(req)) {
        var result = await executeQueryselect("combinedTask", "select id,name from states_task15");
        res.send({ result });
    } else {
        res.redirect('/login');
    }
};

const t11_fetch_city = async function (req, res) {
    if (await authentication(req)) {
        var query = "select * from cities_task15 where state_id=" + req.params.state;
        var result = await executeQueryselect("combinedTask", query);
        res.send({ result });
    } else {
        res.redirect('/login');
    }
};

async function insertData(database, query) {
  
    let result = await executeQueryInsert(database, query);
    return result;
   
}


module.exports = { t11_fetch_city, t11_fetch_state, t11_display, t11_insert, t11_fetch_user_by_id, t11_post_data, t11_update_by_id, t11_update_data_by_id, t11_fetch_data };