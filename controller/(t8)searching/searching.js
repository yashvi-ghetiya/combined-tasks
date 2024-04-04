
let recordsPerPage = 10;
let totalPages, currentPage, offset;
const { executeQueryselect } = require('../../database_functions/executeQuery');

const t8_searching = async (req, res) => {
    let query, values, result, result1;
    query = "select firstname,lastname from users_task12 where id=? and status=1;";
    values = [req.id];
    try {
        result = await executeQueryselect("combinedTask", query, values);
    }
    catch (err) {
        res.redirect('/error');
    }
    if (req.query['iddetails'] == 'Show data') {
        if (req.query['database'] == undefined || req.query['database'] == null || req.query['database'] == '') {
            res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Please Enter Ids in Text Box", query: '', database: '', more: 0 });
        }
        else {

            query = 'select * from student_master_task1 where sid in (' + req.query['database'] + ');';
            values = [];
            try {
                result1 = await executeQueryselect("combinedTask", query, values);

            }
            catch (err) {
                res.redirect('/error');
            }


            //Calculate Pages=============================================================================================
            if (result1 != undefined) {
                console.log("object");
                if (result1.length < recordsPerPage) {
                    totalPages = 1;
                }
                else {
                    let totalRecords = result1.length;
                    totalPages = Math.ceil(totalRecords / recordsPerPage);
                }
                //Fetch Current Page==========================================================================================
                if (req.query['page'] == '' || req.query['page'] == null || req.query['page'] == undefined) {
                    currentPage = 1;
                    offset = 0;
                }
                else {
                    currentPage = req.query['page'];
                    offset = (Number(currentPage) * recordsPerPage) - recordsPerPage;
                }
                //Render Data==================================================================================================
                if (result1 == "database") {
                    res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error in Database Connection!", query: '', database: '', ordertype: '', more: 2 });
                }
                else if (result1 == false) {
                    res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error in Fetching Data from Table!", query: '', database: '', ordertype: '', more: 2 });
                }
                else if (totalPages < currentPage || currentPage < 1) {
                    res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error occured", query: '', database: '', ordertype: '', more: 2 });
                }
                else {
                    if (req.query['clicked']) {
                        result1 = result1.slice(offset, currentPage * recordsPerPage);
                        res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], keys: result1[0], results: result1, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: '', more: 0 })
                    }
                    else {
                        const sort = (data, key, type) => {
                            for (let i = 0; i < data.length; i++) {
                                for (let j = 0; j < data.length - 1; j++) {
                                    if (data[j][key] > data[j + 1][key] && type == 'ASC') {
                                        temp = data[j];
                                        data[j] = data[j + 1];
                                        data[j + 1] = temp;
                                    }
                                    if (data[j][key] < data[j + 1][key] && type == 'DESC') {
                                        temp = data[j];
                                        data[j] = data[j + 1];
                                        data[j + 1] = temp;
                                    }
                                }
                            }
                            return data;
                        }
                        let orderby2 = '', ordertype2 = '';
                        if (req.query['orderby'] != '' || req.query['ordertype'] != '' || req.query['orderby'] != undefined || req.query['ordertype'] != undefined) {
                            ordertype2 = req.query['ordertype'];
                            orderby2 = req.query['orderby'];
                        }
                        result1 = sort(result1, req.query['orderby'], req.query['ordertype'])
                        result1 = result1.slice(offset, currentPage * recordsPerPage);
                        res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], keys: result1[0], results: result1, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: ordertype2, orderby: orderby2, more: 0 })
                    }
                }
            }
        }
    }
    //
    else if (req.query['moredetails'] == 'Show data') {
        if (req.query['fname'] == undefined || req.query['fname'] == null || req.query['fname'] == '') {
            if (req.query['lname'] == undefined || req.query['lname'] == null || req.query['lname'] == '') {
                if (req.query['bgroup'] == undefined || req.query['bgroup'] == null || req.query['bgroup'] == '') {
                    res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Please Enter firstname,lastname and blood group in Text Box", query: '', database: '', more: 2 });
                }
            }
        }
        else {
            query = 'select * from student_master_task1 where fname=? ' + req.query['op'] + ' lname=? ' + req.query['op'] + ' bgroup=?';
            values = [req.query['fname'], req.query['lname'], req.query['bgroup']];
            try {
                result1 = await executeQueryselect("combinedTask", query, values);
            }
            catch (err) {
                res.redirect('/error');
            }
            
            console.log(result1.length);
            if (result1 == undefined || result1 == '' || result1.length==0) {
                result1 = "No data Found";
            }
            else
            {

            }

            //Calculate Pages=============================================================================================

            if (result1.length < recordsPerPage) {
                totalPages = 1;
            }
            else {
                let totalRecords = result1.length;
                totalPages = Math.ceil(totalRecords / recordsPerPage);
            }
            //Fetch Current Page==========================================================================================
            if (req.query['page'] == '' || req.query['page'] == null || req.query['page'] == undefined) {
                currentPage = 1;
                offset = 0;
            }
            else {
                currentPage = req.query['page'];
                offset = (Number(currentPage) * recordsPerPage) - recordsPerPage;
            }
            //Render Data==================================================================================================
            if (result1 == "database") {
                res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error in Database Connection!", query: '', database: '', ordertype: '', more: 2 });
            }
            else if (result1 == false) {
                res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error in Fetching Data from Table!", query: '', database: '', ordertype: '', more: 2 });
            }
            else if (totalPages < currentPage || currentPage < 1) {
                res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error occured", query: '', database: '', ordertype: '', more: 2 });
            }
            else if (typeof result1 == "string") {
                res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: result, query: '', database: '', ordertype: '', more: 2 });
            }
            else {
                if (req.query['clicked']) {
                    result1 = result1.slice(offset, currentPage * recordsPerPage);
                    res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], keys: result1[0], results: result1, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: '', more: 1, fname: req.query['fname'], lname: req.query['lname'], bgroup: req.query['bgroup'], op: req.query['op'] })
                }
                else {
                    const sort = (data, key, type) => {
                        for (let i = 0; i < data.length; i++) {
                            for (let j = 0; j < data.length - 1; j++) {
                                if (data[j][key] > data[j + 1][key] && type == 'ASC') {
                                    temp = data[j];
                                    data[j] = data[j + 1];
                                    data[j + 1] = temp;
                                }
                                if (data[j][key] < data[j + 1][key] && type == 'DESC') {
                                    temp = data[j];
                                    data[j] = data[j + 1];
                                    data[j + 1] = temp;
                                }
                            }
                        }
                        return data;
                    }
                    let orderby2 = '', ordertype2 = '';
                    if (req.query['orderby'] != '' || req.query['ordertype'] != '' || req.query['orderby'] != undefined || req.query['ordertype'] != undefined) {
                        ordertype2 = req.query['ordertype'];
                        orderby2 = req.query['orderby'];
                    }
                    result1 = sort(result1, req.query['orderby'], req.query['ordertype'])
                    result1 = result1.slice(offset, currentPage * recordsPerPage);
                    res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], keys: result1[0], results: result1, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: ordertype2, orderby: orderby2, more: 1, fname: req.query['fname'], lname: req.query['lname'], bgroup: req.query['bgroup'], op: req.query['op'] })
                }
            }
        }
    }
    else if (req.query['moredetails'] == 'Show data1') {
        res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], query: '', database: '', more: 1, fname: '', lname: '', bgroup: '', error: 'Please Enter fname,lname,bgroup in Text Box' });
    }
    else {
        res.render('./(t8)searching/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Please Enter Ids in Text Box", query: '', database: '', more: 0 });
    }
};
module.exports = t8_searching;