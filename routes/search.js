const { omdbiapikey } = require('../config');
const axios = require('axios');
const Top = require('../models/top');

module.exports = app => {
  app.get('/search', async(req, res) => {
    const { title, year } = req.query;
    const query = `http://www.omdbapi.com/?apikey=${omdbiapikey}&s=${title}&y=${year}`;
    const { data } = await axios(query);
    if(data.Error)
      return res.render('404');
    const firstMovie = data.Search[0];
    const findTheMovie = await Top.findOne({imdbID: firstMovie.imdbID});
    if(findTheMovie === null) {
      Top.create(firstMovie);
    } else {
      await Top.findByIdAndUpdate(findTheMovie._id, {$inc: {hit: 1}});
    }
    res.render('search', { title, data: data.Search });
  })
}
