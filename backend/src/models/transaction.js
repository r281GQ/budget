module.exports = mongoose => {
  const moment = require('moment');

  const { currencyValidator } = require('./../services/validators');
  const {
    ID_INVALID_OR_NOT_PRESENT,
    FORBIDDEN_RESOURCE,
    RESOURCE_NOT_FOUND,
    SERVER_ERROR,
    ACCOUNT_BALANCE,
    DEPENDENCIES_NOT_MET,
    BUDGET_INCOME_CONFLICT
  } = require('./../utils/errors');

  const Schema = mongoose.Schema;

  let transactionSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      trim: true
    },
    currency: {
      type: String,
      validate: {
        validator: currencyValidator
      },
      required: true,
      default: 'GBP'
    },
    date: {
      required: true,
      type: Date,
      default: moment
    },
    memo: {
      type: String,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget'
    },
    grouping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grouping',
      required: true
    },
    equity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equity'
    }
  });

  transactionSchema.pre('save', function(next) {
    let transaction = this;
    let Grouping = mongoose.model('Grouping');

    Grouping.findOne({ _id: transaction.grouping, user: transaction.user })
      .then(grouping => {
        if (!grouping) return next(new Error(DEPENDENCIES_NOT_MET));
        if (grouping.type === 'income' && transaction.budget)
          return next(new Error(BUDGET_INCOME_CONFLICT));
        return next();
      })
      .catch(error => {
        next(error);
      });
  });

  transactionSchema.pre('save', function(next) {
    let transaction = this;
    let Budget = mongoose.model('Budget');

    if (!transaction.budget) next();

    Budget.findOne({ _id: transaction.budget, user: transaction.user })
      .then(grouping => {
        if (!grouping) return next(new Error(RESOURCE_NOT_FOUND));
        next();
      })
      .catch(error => {
        next(error);
      });
  });

  transactionSchema.pre('save', function(next) {
    let transaction = this;
    let Account = mongoose.model('Account');
    let Grouping = mongoose.model('Grouping');

    Promise.all([
      Account.findOne({ _id: transaction.account, user: transaction.user }),
      Grouping.findOne({ _id: transaction.grouping, user: transaction.user })
    ])
      .then(items => {
        if (!items[0]) return next(new Error(DEPENDENCIES_NOT_MET));
        if (items[1].type === 'income') return next();
        return items[0].currentBalance();
      })
      .then(currentBalance => {
        if (currentBalance - transaction.amount < 0)
          return next(new Error(ACCOUNT_BALANCE));
        next();
      })
      .catch(error => {
        next(error);
      });
  });

  transactionSchema.pre('save', function(next) {
    let transaction = this;
    let Budget = mongoose.model('Budget');

    if (!transaction.budget) return next();

    Budget.findOne({ _id: transaction.budget })
      .then(budget => {
        return budget.assignBudgetPeriod(transaction.date);
      })
      .then(() => next())
      .catch(error => next(error));
  });

  transactionSchema.pre('remove', function(next) {
    let transaction = this;
    let Account = mongoose.model('Account');
    let Grouping = mongoose.model('Grouping');

    Grouping.findOne({ _id: transaction.grouping })
      .then(grouping => {
        transaction.grouping = grouping;
        return Account.findOne({ _id: transaction.account });
      })
      .then(account => {
        if (transaction.grouping.type === 'expense') return next();
        return account.currentBalance();
      })
      .then(currentBalance => {
        if (currentBalance - transaction.amount < 0)
          return next(new Error(ACCOUNT_BALANCE));
        next();
      })
      .catch(error => {
        next(error);
      });
  });

  transactionSchema.statics.dates = function(user) {
    return new Promise((resolve, reject) => {
      this.find({ user })
        .then(transactions =>
          transactions.reduce((sum, transaction) => {
            const currentDate = moment(transaction.date).format('MM-YYYY');
            if (!sum[currentDate]) sum[currentDate] = currentDate;
            return sum;
          }, {})
        )
        .then(dates => resolve(dates));
    });
  };

  mongoose.model('Transaction', transactionSchema);
};
