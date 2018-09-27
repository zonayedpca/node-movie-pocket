const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PocketSchema = new Schema({
  Title: String,
  Year: Number,
  imdbID: String,
  Type: String,
  Poster: String
})

PocketSchema.pre('remove', function() {
  console.log('Pre Middleware: ');
})

const Pocket = mongoose.model('Pocket', PocketSchema);

module.exports = Pocket;
