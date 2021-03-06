module.exports = mongoose => {
  const {
    currencyValidator
  } = require('./../services/validators');

  const Schema = mongoose.Schema;

  let AccountSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    initialBalance: {
      type: Number,
      required: true,
      min: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    currency: {
      type: String,
      validate: {
        validator: currencyValidator
      },
      required: true,
      default: 'GBP'
    }
  });

  //rewrite transaction query
  AccountSchema.methods.currentBalance = function () {
    const account = this;
    const Transaction = mongoose.model('Transaction');
    // const Grouping = mongoose.model('Grouping');

    return new Promise((resolve, reject) => {
      Transaction.find({
          account: account._id
        })
        .populate('grouping')
        .then(transactions => {
          const total = transactions.reduce(
            (sum, transaction) =>
            transaction.grouping.type === 'income' ?
            sum + transaction.amount :
            sum - transaction.amount,
            account.initialBalance
          );
          resolve(total);
        })
        .catch(error => reject(error));
    });
  };

  AccountSchema.pre('remove', function (next) {
    const Transaction = mongoose.model('Transaction');
    Transaction.remove({
        account: this._id
      })
      .then(() => next())
      .catch(error => next(error));
  });

  mongoose.model('Account', AccountSchema);
};