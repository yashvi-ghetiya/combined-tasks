var mysql = require('mysql');

let con; 
function DBConnect(db)
{
    let res = new Promise((resolve,reject)=>{
            con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "root",
                database: db
            })
            con.connect((err)=>{
                if(err)
                {
                    reject(err);
                }
                else{
                    resolve(con);
                }
            });
        })

    let result =  res.then((result) => {
        return result
    }).catch((err) => {
        return false;
    });

    return result;
}

module.exports = {DBConnect} ;