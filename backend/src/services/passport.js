const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('./../config')();

const User = mongoose.model('User');

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => done(error))
);

const mapToDbProps = profile => ({
  name: profile.displayName,
  email: profile.emails[0].value,
  sex: profile.gender,
  googleAuthId: profile.id,
  picture: profile.photos[0].value
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) =>
      User.findOne({ email })
        .then(
          user =>
            !user
              ? done(null, false)
              : bcrypt.compare(
                  password,
                  user.password,
                  (err, result) =>
                    result ? done(null, user) : done(null, false)
                )
        )
        .catch(error => done(error))
  )
);
