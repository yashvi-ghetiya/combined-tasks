
const { executeQuery } = require('../../database_functions/executeQuery');
var recordsPerPage = 10;
var totalPages, currentPage, offset;
var ordertype = '';
const { authentication, getUserId } = require("../../functions/authentication");

const t7_display =async (req, res) => {
    if (await authentication(req)) {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
        ordertype = '';
        if (req.query['query'] == '' || req.query['query'] == null || req.query['query'] == undefined || req.query['database'] == undefined || req.query['database'] == null || req.query['database'] == '') {
            res.render('./(t7)dynamic-table/html/display', { firstname:userName[0]['firstname'],lastname:userName[0]['lastname'], error: "Please Enter Query in Text Box and Enter Database Name!", query: '', database: '' });
        }
        else {

            let result = await executeQuery(req.query['database'], req.query['query']);
            //Calculate Pages=============================================================================================

            if (result.length < recordsPerPage) {
                totalPages = 1;
            }
            else {
                var totalRecords = result.length;
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


            if (result == "database") {
                res.render('./(t7)dynamic-table/html/display', { firstname:userName[0]['firstname'],lastname:userName[0]['lastname'], error: "Opps Some Error in Database Connection!", query: '', database: '', ordertype: '' });
            }

            else if (result == false) {
                res.render('./(t7)dynamic-table/html/display', { firstname:userName[0]['firstname'],lastname:userName[0]['lastname'], error: "Opps Some Error in Fetching Data from Table!", query: '', database: '', ordertype: '' });
            }

            else if (totalPages < currentPage || currentPage < 1) {
                res.render('./(t7)dynamic-table/html/display', { firstname:userName[0]['firstname'],lastname:userName[0]['lastname'], error: "Opps Some Error occured", query: '', database: '', ordertype: '' });
            }

            else {
                if (req.query['clicked']) {
                    
                    result = result.slice(offset, currentPage * recordsPerPage);
                    res.render('./(t7)dynamic-table/html/display', { firstname:userName[0]['firstname'],lastname:userName[0]['lastname'], keys: result[0], results: result, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: ordertype })
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
                    result = sort(result, req.query['orderby'], req.query['ordertype'])
                    result = result.slice(offset, currentPage * recordsPerPage);
                    res.render('./(t7)dynamic-table/html/display', { firstname:userName[0]['firstname'],lastname:userName[0]['lastname'], keys: result[0], results: result, page: currentPage, error: '', query: req.query['query'], lastpage: totalPages, database: req.query['database'], ordertype: ordertype, orderby: req.query['orderby'] })
                }
            }
        }
    }
    else {
        res.redirect('/login');
    }
};

module.exports = t7_display;