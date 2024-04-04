const jwt = require('jsonwebtoken');

let authentication = async(req,res,next) => {
    let token = req.cookies['token'];
    if(token){ 
    const decoded = jwt.verify(token,process.env.token_secret_key);
    if(decoded){
        req.id = decoded.userId;
        next();
    }
    else{
        res.redirect('/login');
    }
    }
    else{
        res.redirect('/login');
    }
}
module.exports = { authentication };  