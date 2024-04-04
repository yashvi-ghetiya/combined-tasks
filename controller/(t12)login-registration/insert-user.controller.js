let crypto = require('crypto');
const { executeQueryInsert } = require('../../database_functions/executeQuery');


const insertUser = async function (req, res) {
    let activationcode = crypto.randomBytes(32).toString('hex').slice(0, 12);
    let data = req.body;
    try{
    let res1 = await executeQueryInsert('combinedTask', `insert into users_task12(firstname,lastname,email,contact,activation_code,status)values('${data['firstname']}'
    ,'${data['lastname']}'
    ,'${data['email']}',
    '${data['mobile']}',
    '${activationcode}',
    ${false})`);
    res.send({ activationcode: activationcode });
}
catch (err) {
    res.redirect('/error');
}
};


module.exports = insertUser;