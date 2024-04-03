
const { executeQuery } = require('../../database_functions/executeQuery');

const t9_searching_by_delimiter_post = async (req, res) => {
    try{
    let userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
    }
    catch (err) {
        res.redirect('/error');
    }
    let data = req.body.clause;

    let query = "select * from student_master_task1 where";

    if (generateQuery(data, '_', "fname")) {
        query += ' ' + generateQuery(data, '_', "fname");
    }
    if (generateQuery(data, '^', "lname")) {
        if (query.includes(')')) {
            query += ' and ' + generateQuery(data, '^', "lname");
        }
        else {
            query += ' ' + generateQuery(data, '^', "lname");
        }
    }
    if (generateQuery(data, '$', "email")) {
        if (query.includes(')')) {
            query += ' and ' + generateQuery(data, '$', "email");
        }
        else {
            query += ' ' + generateQuery(data, '$', "email");
        }
    }
    if (generateQuery(data, '}', "gender")) {
        if (query.includes(')')) {
            query += ' and ' + generateQuery(data, '}', "gender");
        }
        else {
            query += ' ' + generateQuery(data, '}', "gender");

        }
    }
    if (generateQuery(data, '{', "bgroup")) {
        if (query.includes(')')) {
            query += ' and ' + generateQuery(data, '{', "bgroup");
        }
        else {
            query += ' ' + generateQuery(data, '{', "bgroup");
        }
    }
    if (generateQuery(data, '#', "address")) {
        if (query.includes(')')) {
            query += ' and ' + generateQuery(data, '#', "address");
        }
        else {
            query += ' ' + generateQuery(data, '#', "address");
        }
    }
    query += ' ;';


    try{
    let result = await executeQuery('combinedTask', query);
    res.render('./(t9)searching-by-delimiter/html/display', { firstname: userName[0]['firstname'], lastname: userName[0]['lastname'], keys: result[0], results: result, error: '' });
    }
    catch (err) {
        res.redirect('/error');
    }
};

const t9_searching_by_delimiter_get = async (req, res) => {
    try{
    let userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
    res.render('./(t9)searching-by-delimiter/html/display', { firstname: userName[0]['firstname'], lastname: userName[0]['lastname'], keys: '', results: '', error: 'Enter values' });
    }
    catch (err) {
        res.redirect('/error');
    }
};

function generateQuery(data, delimiter, columnname) {
    let mainstr = '';
    let delimiters = ['_', '^', '}', '{', '#', '$'];
    if (data.includes(delimiter)) {
        mainstr = '(';
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            let str = '';
            if (data[i] == delimiter) {
                str += columnname + " like '";

                for (let j = i + 1; j < data.length; j++) {
                    if (delimiters.includes(data[j])) {
                        break;
                    }
                    str += data[j];
                }
                str += "%'";
                if (count == 0) {
                    mainstr += str;
                }
                else {
                    mainstr += ' or ' + str;
                }
                count++;
            }
        }
        mainstr += ')';
        return mainstr;
    }
    else {
        return mainstr;
    }

}

module.exports = { t9_searching_by_delimiter_get, t9_searching_by_delimiter_post };