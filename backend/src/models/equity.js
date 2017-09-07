module.exports = mongoose => {
  const { currencyValidator } = require('./../services/validators');

  const Schema = mongoose.Schema;

  const equitySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      validate: {
        validator: type => type === 'asset' || type === 'liability'
      },
      required: true
    },
    initialBalance: {
      required: true,
      type: Number
    },
    currency: {
      required: true,
      type: String,
      default: 'GBP',
      validate: {
        validator: currencyValidator
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  equitySchema.methods.currentBalance = function() {
    const equity = this;

    const Transaction = mongoose.model('Transaction');

    return new Promise((resolve, reject) => {
      Transaction.find({ equity: equity._id })
        .populate('grouping equity')
        .then(transactions => {
          const sum = transactions.reduce((sum, transaction) => {
            if (
              (transaction.grouping.type === 'income' &&
                transaction.equity.type === 'liability') ||
              (transaction.grouping.type === 'expense' &&
                transaction.equity.type === 'asset')
            )
              return sum + transaction.amount;
            else if (
              (transaction.grouping.type === 'expense' &&
                transaction.equity.type === 'liability') ||
              (transaction.grouping.type === 'income' &&
                transaction.equity.type === 'asset')
            )
              return sum - transaction.amount;
          }, 0);
          resolve(equity.initialBalance + sum);
        })
        .catch(error => reject(error));
    });
  };

  equitySchema.pre('remove', function(next) {
    const equity = this;

    const Transaction = mongoose.model('Transaction');

    Transaction.update({ equity }, { $unset: { equity: 1 } })
      .then(() => next())
      .catch(error => next(error));
  });

  mongoose.model('Equity', equitySchema);
};
