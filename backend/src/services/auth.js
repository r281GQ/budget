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

module.exports = { handleSignUp };
