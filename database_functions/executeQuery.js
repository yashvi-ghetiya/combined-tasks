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

module.exports = {executeQuery} ;