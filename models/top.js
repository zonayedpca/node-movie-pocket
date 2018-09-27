const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TopSchema = new Schema({
  Title: String,
  Year: Number,
  imdbID: String,
  Type: String,
  Poster: String,
  hit: {
    type: Number,
    default: 1
  }
})

const Top = mongoose.model('Top', TopSchema);

module.exports = Top;
