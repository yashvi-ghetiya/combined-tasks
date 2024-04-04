
const { executeQueryselect, executeQuery } = require('../../database_functions/executeQuery');
let recordsPerPage = 10;
let totalPages, currentPage, offset;
let ordertype = '';


const t7_display = async (req, res) => {
    let query, values, result;
    query = "select firstname,lastname from users_task12 where id=? and status=1;";
    values = [req.id];
    try {
        result = await executeQueryselect("combinedTask", query, values);

    }
    catch (err) {
        res.redirect('/error');
    }
    ordertype = '';
    if (req.query['query'] == '' || req.query['query'] == null || req.query['query'] == undefined || req.query['database'] == undefined || req.query['database'] == null || req.query['database'] == '') {
        res.render('./(t7)dynamic-table/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Please Enter Query in Text Box and Enter Database Name!", query: '', database: '' });
    }
    else {
        let result1;
        try {
            result1 = await executeQuery(req.query['database'], req.query['query']);
        }
        catch (err) {
            res.redirect('/error');
        }
        //Calculate Pages=============================================================================================

        if (result1 != undefined) {
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
                res.render('./(t7)dynamic-table/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error in Database Connection!", query: '', database: '', ordertype: '' });
            }

            else if (result1 == false) {
                console.log(false);
                res.render('./(t7)dynamic-table/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error in Fetching Data from Table!", query: '', database: '', ordertype: '' });
            }

            else if (totalPages < currentPage || currentPage < 1) {
                res.render('./(t7)dynamic-table/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], error: "Opps Some Error occured", query: '', database: '', ordertype: '' });
            }
             else {
            if (req.query['clicked']) {

                result1 = result1.slice(offset, currentPage * recordsPerPage);
                res.render('./(t7)dynamic-table/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], keys: result1[0], results: result1, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: ordertype })
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
                result1 = sort(result1, req.query['orderby'], req.query['ordertype'])
                result1 = result1.slice(offset, currentPage * recordsPerPage);
                res.render('./(t7)dynamic-table/html/display', { firstname: result[0]['firstname'], lastname: result[0]['lastname'], keys: result1[0], results: result1, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: ordertype, orderby: req.query['orderby'] })
            }
        }

        }




       
    }

};

module.exports = t7_display;