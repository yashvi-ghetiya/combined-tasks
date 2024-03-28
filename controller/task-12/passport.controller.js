const passport_jwt = require('../../functions/passport');
const passport = require("express").Router();

passport.get("/task-12/passport",passport_jwt.authenticate(''));



module.exports = passport;