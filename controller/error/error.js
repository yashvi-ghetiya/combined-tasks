const error = async function (req, res) {
  res.render('./general-error/error.ejs')
}

module.exports = error;
