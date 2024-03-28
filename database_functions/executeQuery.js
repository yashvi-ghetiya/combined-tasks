const { DBConnect } = require('./dbConnect');

async function executeQuery(db,query)
{
    const con = await DBConnect(db);
   
    if(con==false)
    {
        return "database";
    }
    else
    {
        let res = new Promise((resolve,reject)=>{
                con.query(query, (err, result)=>{
                    if(err)
                    {
                        reject(err);
                    }
                    else{
                        resolve(result);
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

async function executeQueryInsert(db,query)
{
    const con = await DBConnect(db);
   
    if(con==false)
    {
        return "database";
    }
    else
    {
        let res = new Promise((resolve,reject)=>{
                con.query(query, (err, result)=>{
                    if(err)
                    {
                        reject(err);
                    }
                    else{
                        console.log(result.insertId);
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

async function executeQueryselect(db,query,values)
{
    const con = await DBConnect(db);
   
    if(con==false)
    {
        return "database";
    }
    else
    {
        let res = new Promise((resolve,reject)=>{
                con.query(query, values, (err, result)=>{
                    if(err)
                    {
                        reject(err);
                    }
                    else{
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

async function executeQueryupdate(db,query,values)
{
    const con = await DBConnect(db);
   
    if(con==false)
    {
        return "database";
    }
    else
    {
        let res = new Promise((resolve,reject)=>{
                con.query(query, values, (err, result)=>{
                    if(err)
                    {
                        reject(err);
                    }
                    else{
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

async function executeQueryUpdate_simpleQuery(db,query)
{
    const con = await DBConnect(db);
   
    if(con==false)
    {
        return "database";
    }
    else
    {
        let res = new Promise((resolve,reject)=>{
                con.query(query, (err, result)=>{
                    if(err)
                    {
                        reject(err);
                    }
                    else{
                        resolve([result.insertId,result.affectedRows]);
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

async function executeselectQuery(db,query)
{
    const con = await DBConnect(db);
   
    if(con==false)
    {
        return "database";
    }
    else
    {
        let res = new Promise((resolve,reject)=>{
                con.query(query, (err, result)=>{
                    if(err)
                    {
                        reject(err);
                    }
                    else{
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
module.exports = {executeQuery,executeQueryselect,executeQueryupdate,insertData,executeQueryInsert,executeQueryUpdate_simpleQuery,executeselectQuery} ;