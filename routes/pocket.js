const { omdbiapikey } = require('../config');
const axios = require('axios');
const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/user');
const Pocket = require('../models/pocket');

module.exports = app => {
  app.get('/pocket', isLoggedIn, async(req, res) => {
    res.locals.mainTitle = 'My Pocket - Movie Pocket';
    const items = await User.findById(req.user._id).populate('pocket');
    const { pocket: data } = items;
    const added = req.flash('added');
    const removed = req.flash('removed');
    res.render('pocket', { title: 'My Pocket', data, added, removed})
  });

  app.get('/new/:movieID', isLoggedIn, async(req, res) => {
    const user = req.user;
    const imdbID = req.params.movieID;
    const query = `http://www.omdbapi.com/?apikey=${omdbiapikey}&i=${imdbID}&plot=full`;
    const { data } = await axios(query);
    const theMovie = {
      Title: data.Title,
      Year: data.Year,
      imdbID: data.imdbID,
      Type: data.Type,
      Poster: data.Poster
    }
    const newMovie = await Pocket.create(theMovie);
    user.pocket.push(newMovie);
    const theUser = await user.save();
    req.flash('added', `'${theMovie.Title}' has been added to your pocket`);
    res.redirect('/pocket');
  });

  app.get('/:Type/:movieID/remove', isLoggedIn, async(req, res) => {
    const data = await User.findById(req.user._id).populate('pocket');
    const theMovie = data.pocket.filter(one => one.imdbID === req.params.movieID);
    const movieDataID = theMovie[0]._id;
    const pocket = await Pocket.deleteOne({_id: movieDataID});
    req.flash('removed', 'The Movie has been Removed from Your Pocket');
    res.redirect('/pocket');
  });
}
