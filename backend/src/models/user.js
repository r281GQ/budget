const bcrypt = require('bcrypt');

module.exports = mongoose => {
  const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    userName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    lastLoginTime: {
      type: Date
    },
    sex: {
      type: String
    },
    dob: {
      type: Date
    },
    googleAuthId: {
      type: String
    },
    picture: {
      type: String
    },
    password: {
      type: String
    }
  });

  userSchema.pre('save', function(next) {
    const user = this;

    if (!user.googleAuthId)
      user.isNew || user.isModified('password')
        ? bcrypt.hash(user.password, 10, (error, hash) => {
            if (error) next(error);
            user.password = hash;
            next();
          })
        : next();
    else next();
  });

  userSchema.pre('remove', function(next) {
    const Transaction = mongoose.model('Transaction');
    Transaction.remove({ user: { $in: this } })
      .then(() => next())
      .catch(err => {
        next(err);
      });
  });

  userSchema.pre('remove', function(next) {
    const Budget = mongoose.model('Budget');
    Budget.remove({ user: { $in: this } })
      .then(() => next())
      .catch(err => {
        next(err);
      });
  });

  userSchema.pre('remove', function(next) {
    const Account = mongoose.model('Account');
    Account.remove({ user: { $in: this } })
      .then(() => next())
      .catch(err => {
        next(err);
      });
  });

  userSchema.pre('remove', function(next) {
    const Grouping = mongoose.model('Grouping');
    Grouping.remove({ user: { $in: this } })
      .then(() => next())
      .catch(err => {
        next(err);
      });
  });

  userSchema.pre('remove', function(next) {
    const Equity = mongoose.model('Equity');
    Equity.remove({ user: { $in: this } })
      .then(() => next())
      .catch(err => {
        next(err);
      });
  });

  mongoose.model('User', userSchema);
};
