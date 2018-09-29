module.exports = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('err', 'Please Login First');
  res.redirect('/login');
}
