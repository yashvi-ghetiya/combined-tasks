const { executeQueryInsert, executeQueryselect, executeQuery } = require('../../database_functions/executeQuery');
const { updateData } = require('../../functions/updatefile');
const { logger } = require('../../logger');


const t11_insert = async (req, res) => {
    try {
        let userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
        res.render('./(t11)job-application-form-nextFuncationality/html/form.ejs', { submitype: "insert", firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    } catch (err) {
        res.redirect('/error');
    }
};

const t11_display = async function (req, res) {
    try {
        let userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
        res.render('./(t11)job-application-form-nextFuncationality/html/display', { firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    } catch (err) {
        res.redirect('/error');
    }
}
const t11_fetch_user_by_id = async function (req, res) {
    let userName, query, values, can, edu, lang, pref, ref, tech, work;
    try {
        userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
        query = "SELECT * from candidateMaster_task15 where canid = ? ;";
        values = [req.params.id]
        can = await executeQueryselect("combinedTask", query, values);


        query = "SELECT * from educationDetails_task15 where canid = ? ;";
        values = [req.params.id]
        edu = await executeQueryselect("combinedTask", query, values);


        query = "SELECT * from languageKnown_task15 where canid = ? ;";
        values = [req.params.id]
        lang = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from preference_task15 where canid = ? ;";
        values = [req.params.id]
        pref = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from referenceContact_task15 where canid = ? ;";
        values = [req.params.id]
        ref = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from technologyYouKnow_task15 where canid = ? ;";
        values = [req.params.id]
        tech = await executeQueryselect("combinedTask", query, values);

        query = "SELECT * from workExperience_task15 where canid = ? ;";
        values = [req.params.id]
        work = await executeQueryselect("combinedTask", query, values);
    }
    catch (err) {
        res.redirect('/error');
    }
    res.send({
        can,
        edu,
        lang,
        pref,
        ref,
        tech,
        work
    })

};

const t11_post_data = async function (req, res) {

    const arr = req.body;
    let result1, result2;
    try {
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
    }
    catch (err) {
        res.redirect('/error');
    }

    if (result1 == "database") {
    logger.info('error in db connection');
    }
    else if (result1 == false) {
        logger.info('error in basic details insertion');

    }
    else if (typeof Number(result1) == "number") {
        for (let i = 0; i < arr['edu'].length; i++) {
            if (arr['edu'][i] == '') {
                break;
            }
            try {
                result2 = await insertData("combinedTask", `INSERT INTO educationDetails_task15 
             (canid,degree,board_courseName,passingYear,percentage) 
             VALUES 
             ('${Number(result1)}',
             '${arr['degree'][i]}',
             '${arr['edu'][i]}',
             '${arr['edupassingyear'][i]}',
             '${Number(arr['eduper'][i])}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
    }

    if (result2 == "database") {
        logger.info('error in db connection');
        }
    else if (result2 == false) {
        logger.info('error in edu data insertion');
    }
    else if (typeof Number(result2) == "number") {
        for (let i = 0; i < arr['company'].length; i++) {
            if (arr['company'][i] == '') {
                break;
            }
            try {
                result2 = await insertData("combinedTask", `INSERT INTO workExperience_task15 
         (canid,companyName,designation,fromDate,toDate) 
            VALUES 
            ('${Number(result1)}',
            '${arr['company'][i]}',
            '${arr['des'][i]}',
            '${arr['workfrom'][i]}',
            '${arr['workto'][i]}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
    }

    if (result2 == "database") {
        logger.info('error in db connection');
    }
    else if (result2 == false) {
        logger.info('error in work data insertion');
    }
    else if (typeof Number(result2) == "number") {
        if (arr['php'] != undefined) {
            try {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
         (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'php',
            '${arr['php']}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
        if (arr['mysql'] != undefined) {
            try {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'mysql',
            '${arr['mysql']}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
        if (arr['laravel'] != undefined) {
            try {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'laravel',
            '${arr['laravel']}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
        if (arr['oracle'] != undefined) {
            try {
                result2 = await insertData("combinedTask", `INSERT INTO technologyYouKnow_task15 
          (canid,technology,level) 
            VALUES 
            ('${Number(result1)}',
            'oracle',
            '${arr['oracle']}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
    }

    if (result2 == "database") {
        logger.info('error in db connection');
    }
    else if (result2 == false) {
        logger.info('error in technology data insertion');
    }
    else if (typeof Number(result2) == "number") {
        let arr1 = ['canRead', 'canWrite', 'canSpeak'];
        let arr2 = [];
        if (arr['hindi'] != undefined) {
            for (let i = 0; i < 3; i++) {
                if (arr1.includes(arr['hindi'][i])) {
                    arr2.push(1);
                }
                else {
                    arr2.push(0);
                }
            }
            try {
                result2 = await insertData("combinedTask", `INSERT INTO languageKnown_task15 
          (canid,language,canRead,canWrite,canSpeak) 
          VALUES 
          ('${Number(result1)}',
          'hindi',
          '${arr2[0]}',
          '${arr2[1]}',
          '${arr2[2]}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
        arr2 = [];
        if (arr['english'] != undefined) {
            for (let i = 0; i < 3; i++) {
                if (arr1.includes(arr['english'][i])) {
                    arr2.push(1);
                }
                else {
                    arr2.push(0);
                }
            }
            try {
                result2 = await insertData("combinedTask", `INSERT INTO languageKnown_task15 
          (canid,language,canRead,canWrite,canSpeak) 
          VALUES 
          ('${Number(result1)}',
          'english',
          '${arr2[0]}',
          '${arr2[1]}',
          '${arr2[2]}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
        arr2 = [];
        if (arr['gujarati'] != undefined) {
            for (let i = 0; i < 3; i++) {
                if (arr1.includes(arr['gujarati'][i])) {
                    arr2.push(1);
                }
                else {
                    arr2.push(0);
                }
            }
            try {
                result2 = await insertData("combinedTask", `INSERT INTO languageKnown_task15 
          (canid,language,canRead,canWrite,canSpeak) 
          VALUES 
          ('${Number(result1)}',
          'gujarati',
          '${arr2[0]}',
          '${arr2[1]}',
          '${arr2[2]}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }

    }

    if (result2 == "database") {
        logger.info('error in db connection');
    }
    else if (result2 == false) {
        logger.info('error in language data insertion');
    }
    else if (typeof Number(result2) == "number") {
        for (let i = 0; i < arr['refname'].length; i++) {
            if (arr['refname'][i] == '') {
                break;
            }
            try {
                result2 = await insertData("combinedTask", `INSERT INTO referenceContact_task15 
             (canid,name,contactNo,relation) 
             VALUES 
             ('${Number(result1)}',
             '${arr['refname'][i]}',
             '${arr['refcontact'][i]}',
             '${arr['refrel'][i]}')`);
            }
            catch (err) {
                res.redirect('/error');
            }
        }
    }

    if (result2 == "database") {
        logger.info('error in db connection');
    }
    else if (result2 == false) {
        logger.info('error in reference data insertion');
    }
    else if (typeof Number(result2) == "number") {
        try {
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
        catch (err) {
            res.redirect('/error');
        }
    }

    res.json({ key: "error" });

};

const t11_update_by_id = async function (req, res) {
    try {
        let userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
        res.render('./(t11)job-application-form-nextFuncationality/html/form.ejs', { submitype: 'update', firstname: userName[0]['firstname'], lastname: userName[0]['lastname'] });
    }
    catch (err) {
        res.redirect('/error');
    }
};

const t11_update_data_by_id = async function (req, res) {
       updateData("combinedTask", req.body, req.params.id);
};

const t11_fetch_data = async function (req, res) {
    try {
        let result = await executeQueryselect("combinedTask", `SELECT canid,fname,lname from candidateMaster_task15;`);
        res.send({ can: result });
    }
    catch (err) {
        res.redirect('/error');
    }
};

const t11_fetch_state = async function (req, res) {
    try {
        let result = await executeQueryselect("combinedTask", "select id,name from states_task15");
        res.send({ result });
    }
    catch (err) {
        res.redirect('/error');
    }
};

const t11_fetch_city = async function (req, res) {

    let query = "select * from cities_task15 where state_id=" + req.params.state;
    try {
        let result = await executeQueryselect("combinedTask", query);
        res.send({ result });
    }
    catch (err) {
        res.redirect('/error');
    }

};

async function insertData(database, query) {
    try {
        let result = await executeQueryInsert(database, query);
        return result;
    }
    catch (err) {
        res.redirect('/error');
    }
}


module.exports = { t11_fetch_city, t11_fetch_state, t11_display, t11_insert, t11_fetch_user_by_id, t11_post_data, t11_update_by_id, t11_update_data_by_id, t11_fetch_data };