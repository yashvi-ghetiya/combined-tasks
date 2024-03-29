const jwt = require('jsonwebtoken');


let authentication = async(req,res) => {
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