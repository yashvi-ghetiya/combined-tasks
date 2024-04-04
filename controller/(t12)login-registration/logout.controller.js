const logout  = (req, res) => {
   try{
   res.clearCookie('token');
   res.redirect('/login');
}
catch (err) {
    res.redirect('/error');
}
}

module.exports = logout;