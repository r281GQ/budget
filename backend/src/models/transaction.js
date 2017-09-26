module.exports = mongoose => {
  const moment = require('moment');

  const {
    currencyValidator
  } = require('./../services/validators');
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

  transactionSchema.pre('save', async function (next) {
    const transaction = this;
    const Grouping = mongoose.model('Grouping');

    try {
      const grouping = await Grouping.findOne({
        _id: transaction.grouping,
        user: transaction.user
      })

      if (!grouping) return next(new Error(DEPENDENCIES_NOT_MET));
      if (grouping.type === 'income' && transaction.budget)
        return next(new Error(BUDGET_INCOME_CONFLICT));
      return next();
    } catch (error) {
      next(error);
    }
  });

  transactionSchema.pre('save', async function (next) {
    const transaction = this;
    const Budget = mongoose.model('Budget');

    if (!transaction.budget) return next();

    try {
      const budget = await Budget.findOne({
        _id: transaction.budget,
        user: transaction.user
      })
      if (!budget) next(new Error(RESOURCE_NOT_FOUND));
      else next();
    } catch (errpr) {
      next(error);
    }
  });

  transactionSchema.pre('save', async function (next) {
    const transaction = this;
    const Account = mongoose.model('Account');
    const Grouping = mongoose.model('Grouping');

    try {
      const items = await Promise.all([
        Account.findOne({
          _id: transaction.account,
          user: transaction.user
        }),
        Grouping.findOne({
          _id: transaction.grouping,
          user: transaction.user
        })
      ]);

      if (!items[0]) return next(new Error(DEPENDENCIES_NOT_MET));
      if (items[1].type === 'income') return next();

      const currentBalance = await items[0].currentBalance();

      if (currentBalance - transaction.amount < 0)
        next(new Error(ACCOUNT_BALANCE));
      else next();
    } catch (error) {
      next(error);
    }
  });

  transactionSchema.pre('save', async function (next) {
    const transaction = this;
    const Budget = mongoose.model('Budget');

    if (!transaction.budget) return next();

    try {
      const budget = await Budget.findOne({
        _id: transaction.budget
      });

      await budget.assignBudgetPeriod(transaction.date);

      next();
    } catch (error) {
      next(error);
    }
  });

  transactionSchema.pre('remove', async function (next) {
    const transaction = this;
    const Account = mongoose.model('Account');
    const Grouping = mongoose.model('Grouping');

    try {
      const grouping = await Grouping.findOne({
        _id: transaction.grouping
      });

      transaction.grouping = grouping;

      const account = await Account.findOne({
        _id: transaction.account
      });


      if (transaction.grouping.type === 'expense') return next();
      const currentBalance = await account.currentBalance();

      if (currentBalance - transaction.amount < 0)
        return next(new Error(ACCOUNT_BALANCE));
      next();
    } catch (error) {
      next(error);
    }
  });

  transactionSchema.statics.dates = async function (user) {
    try {
      const dates = await this.find({
        user
      }).reduce((sum, transaction) => {
        const currentDate = moment(transaction.date).format('MM-YYYY');
        if (!sum[currentDate]) sum[currentDate] = currentDate;
        return sum;
      }, {});
      return dates;
    } catch (error) {
      return (error)
    }
  };

  mongoose.model('Transaction', transactionSchema);
};