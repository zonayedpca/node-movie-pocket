const User = require('../models/user'),
      passport = require('passport');

module.exports = app => {
  app.get('/login', (req, res) => {
    res.locals.mainTitle = 'Login - Movie Pocket';
    const message = req.flash('err');
    res.render('login', { message });
  })

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  app.get('/register', (req, res) => {
    res.locals.mainTitle = 'Register - Movie Pocket';
    const message = req.flash('err');
    res.render('register', { message });
  })

  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.register(new User({username}), password);
      passport.authenticate('local')(req, res, () => {
        req.flash('success', `Welcome ${username}! You can now use Movie Pocket`);
        res.redirect('/');
      })
    } catch(err) {
      req.flash('err', err.message);
      res.redirect('/register');
    }
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })
}
