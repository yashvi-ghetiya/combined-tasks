const jwt = require('jsonwebtoken');
const { executeQuery  } = require('../database_functions/executeQuery');
let authentication = (req) => {
    if (req.cookies['token'] == null || req.cookies['token'] == undefined) {
        return false;
    }
    return true;
}
let getUserId = (req) => {
    const token = req.cookies['token']['token'];
    const decoded = jwt.verify(token,process.env.token_secret_key);
    return decoded.userId;
}
module.exports = { authentication,getUserId };  