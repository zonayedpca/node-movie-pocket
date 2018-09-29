const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      expressSession = require('express-session'),
      LocalStategy = require('passport-local'),
      flash = require('connect-flash'),
      User = require('./models/user'),
      { port, db, secret } = require('./config');

mongoose.connect(db, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
  res.locals.mainTitle = 'Movie Pocket - Your Favorite movie Right into Your Pocket';
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./routes')(app);
require('./routes/authentication')(app);
require('./routes/pocket')(app);
require('./routes/search')(app);
require('./routes/single')(app);

app.listen(port, () => {
  console.log(`Your server is running at port: ${port}`);
});
