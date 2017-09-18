const mongoose = require('mongoose');
const User = mongoose.model('User');

const handleSignUp = ({
    body
  }) =>
  new Promise((resolve, reject) =>
    new User(body)
    .save()
    .then(user => resolve(user))
    .catch(error => reject(error))
  );

const handleIsEmailUnique = ({
    params: {
      email
    }
  }) =>
  new Promise((resolve, reject) =>
    email ? User.findOne({
      email
    })
    .then(user => (user ? resolve(false) : resolve(true)))
    .catch(error => reject(error)) : resolve(false)
  );

module.exports = {
  handleSignUp,
  handleIsEmailUnique
};