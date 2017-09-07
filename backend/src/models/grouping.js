module.exports = mongoose => {
  const { ACCOUNT_BALANCE } = require('./../utils/errors');

  const Schema = mongoose.Schema;

  const groupingSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validate: {
        validator: type => type === 'income' || type === 'expense'
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  groupingSchema.pre('remove', function(next) {
    const Transaction = mongoose.model('Transaction');
    const Account = mongoose.model('Account');

    const grouping = this;

    const accountPromise = Account.find({ user: this.user });

    const transactionPromise = Transaction.find({
      user: this.user,
      grouping: { $ne: grouping }
    }).populate('grouping account');

    Promise.all([accountPromise, transactionPromise])
      .then(collections => {
        const accounts = collections[0];
        const transactions = collections[1];
        accounts.forEach(account => {
          const transactionForAccounts = transactions.filter(transaction =>
            transaction.account._id.equals(account._id)
          );

          const sumWithoutGrouping = transactionForAccounts.reduce(
            (sum, transaction) =>
              transaction.grouping.type === 'income'
                ? sum + transaction.amount
                : sum - transaction.amount,
            account.initialBalance
          );
          if (sumWithoutGrouping < 0) {
            return next(new Error(ACCOUNT_BALANCE));
          } else {
            return next();
          }
        });
      })
      .catch(error => next(error));
  });

  groupingSchema.pre('remove', function(next) {
    const Transaction = mongoose.model('Transaction');

    Transaction.remove({ grouping: this })
      .then(() => next())
      .catch(error => next(error));
  });

  mongoose.model('Grouping', groupingSchema);
};
