const mongoose = require('mongoose');
const User = mongoose.model('User');

const handleSignUp = ({ body }) => {
  console.log(body);
  return new Promise((resolve, reject) =>
    new User(body)
      .save()
      .then(user => resolve(user))
      .catch(error => reject(error))
  );
};

const handleIsEmailUnique = ({ params: { email } }) =>
  new Promise((resolve, reject) =>
    User.findOne({ email })
      .then(user => (user ? resolve(false) : resolve(true)))
      .catch(error => reject(error))
  );

module.exports = { handleSignUp, handleIsEmailUnique };
