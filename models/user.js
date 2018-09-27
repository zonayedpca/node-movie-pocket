const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  username: String,
  password: String,
  pocket: [{
    type: Schema.Types.ObjectId,
    ref: 'Pocket'
  }]
})

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'username'
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
