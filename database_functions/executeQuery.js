const { DBConnect } = require('./dbConnect');

async function executeQuery(db, query) {
    const con = await DBConnect(db);

    if (con == false) {
        return "database";
    }
    else {
        let res = new Promise((resolve, reject) => {
            try {
                con.query(query, (err, result) => {
                    if (err) {
                        console.log(err.sqlMessage);
                        reject(err);
                    }
                    else {
                        console.log(result, query)
                        resolve(result);
                    }
                });
            }
            catch (err) {
                throw err;
            }
        })
        let result = res.then((result) => {
            return result
        }).catch((err) => {
            return false;
        });

        return result;
    }
}

async function executeQueryInsert(db, query, values) {
    const con = await DBConnect(db);

    if (con == false) {
        return "database";
    }
    else {
        let res = new Promise((resolve, reject) => {
            con.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log("success");
                    resolve(result.insertId);
                }
            });
        })
        let result = res.then((result) => {
            return result
        }).catch((err) => {
            return false;
        });
        return result;
    }
}

async function executeQueryselect(db, query, values) {
    const con = await DBConnect(db);

    if (con == false) {
        return "database";
    }
    else {
        return new Promise((resolve, reject) => {
            try {
                con.query(query, values, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {

                        resolve(result);
                    }
                });
            }
            catch (err) {
                throw err;
            }
        })

    }
}

async function executeQueryupdate(db, query, values) {
    const con = await DBConnect(db);

    if (con == false) {
        return "database";
    }
    else {
        let res = new Promise((resolve, reject) => {
            con.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result.affectedRows);
                }
            });
        })
        let result = res.then((result) => {
            return result
        }).catch((err) => {
            return false;
        });
        return result;
    }
}

async function executeQueryUpdate_simpleQuery(db, query) {
    const con = await DBConnect(db);

    if (con == false) {
        return "database";
    }
    else {
        let res = new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve([result.insertId, result.affectedRows]);
                }
            });
        })
        let result = res.then((result) => {
            return result
        }).catch((err) => {
            return err;
        });
        return result;
    }
}

async function executeselectQuery(db, query1) {
    const con = await DBConnect(db);

    if (con == false) {
        return "database";
    }
    else {
        let res = new Promise((resolve, reject) => {
            console.log(query1)
            con.query(query1, (err, result) => {

                if (err) {
                    reject(err);
                }
                else {
                    console.log(query1)
                    console.log(result)
                    resolve(result);
                }
            });
        })
        let result = res.then((result) => {
            return result
        }).catch((err) => {
            return err;
        });
        return result;
    }
}

async function insertData(database, query) {
    let result = await executeQueryInsert(database, query);
    return result;
}
module.exports = { executeQuery, executeQueryselect, executeQueryupdate, insertData, executeQueryInsert, executeQueryUpdate_simpleQuery, executeselectQuery };