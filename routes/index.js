const isLoggedIn = require('../middlewares/isLoggedIn');
const Top = require('../models/top');

module.exports = app => {
  app.get('/', async (req, res) => {
    const topMovies = await Top.find({}).limit(12).sort({hit: -1});
    const message = req.flash('success');
    res.render('index', { data: topMovies, message });
  })
}
