const { omdbiapikey } = require('../config'),
      axios = require('axios'),
      Top = require('../models/top');

module.exports = app => {
  app.get('/search', async(req, res) => {
    const { title, year, type, orderby } = req.query;
    const query = `http://www.omdbapi.com/?apikey=${omdbiapikey}&s=${title}&y=${year}&type=${type}`;
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
    const finalData = orderby === 'za' ? data.Search.reverse() : data.Search;
    res.locals.mainTitle = `Showing results for ${title}- Movie Pocket`;
    res.render('search', { title, data: finalData });
  })
}
