module.exports = mongoose => {
  const {
    ACCOUNT_BALANCE
  } = require('./../utils/errors');

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

  groupingSchema.pre('remove', function (next) {
    const Transaction = mongoose.model('Transaction');

    const grouping = this;

    //simulate what would happen if this gruping was deleted
    // const transactionPromise = Transaction.find({
    //   user: this.user,
    //   grouping: {
    //     $ne: grouping
    //   }
    // }).populate('grouping account');

    // const transactionPromise = Transaction.find({
    //   user: this.user,
    //   grouping: {
    //     $ne: grouping
    //   }
    // }).populate('grouping account');

    return Transaction.aggregate({
        $match: {
          $and: [{
            user: this.user
          }, {
            grouping: {
              $ne: this._id
            }
          }]
        }
      }, {
        $lookup: {
          from: "groupings",
          localField: "grouping",
          foreignField: "_id",
          as: "gr"
        }
      }, {
        $lookup: {
          from: "accounts",
          localField: "account",
          foreignField: "_id",
          as: "acc"
        }
      }, {
        $unwind: "$acc"
      }, {
        $unwind: "$gr"
      }, {
        $addFields: {
          expense: {
            $cond: [{
              $eq: ['$gr.type', 'expense']
            }, '$amount', 0]
          },
          income: {
            $cond: [{
              $eq: ['$gr.type', 'income']
            }, '$amount', 0]
          }
        }
      }, {
        $group: {
          _id: {
            account: "$account",
            initialBalance: "$acc.initialBalance"
          },
          sumExpense: {
            $sum: "$expense"
          },
          sumIncome: {
            $sum: "$income"
          }
        }
      })
      .then(values => {
        if (!values.map(item => item._id.initialBalance + item.sumIncome - item.sumExpense >= 0).every(item => item === true))
          throw new Error(ACCOUNT_BALANCE)
        next()
      })
      .catch(error => next(error))

    // Promise.all([accountPromise, transactionPromise])
    //   .then(collections => {
    //     const accounts = collections[0];
    //     const transactions = collections[1];
    //     accounts.forEach(account => {
    //       const transactionForAccounts = transactions.filter(transaction =>
    //         transaction.account._id.equals(account._id)
    //       );

    //       const sumWithoutGrouping = transactionForAccounts.reduce(
    //         (sum, transaction) =>
    //         transaction.grouping.type === 'income' ?
    //         sum + transaction.amount :
    //         sum - transaction.amount,
    //         account.initialBalance
    //       );
    //       if (sumWithoutGrouping < 0)
    //         throw (new Error(ACCOUNT_BALANCE));
    //     });
    //     return next();
    //   })
    //   .catch(error => next(error));

    // Promise.all([accountPromise, transactionPromise])
    //   .then(collections => {
    //     const accounts = collections[0];
    //     const transactions = collections[1];
    //     accounts.forEach(account => {
    //       const sumWithoutGrouping = transactionForAccounts.reduce(
    //         (sum, transaction) => {
    //           if (transaction.account._id.equals(account._id))
    //             return transaction.grouping.type === 'income' ?
    //             sum + transaction.amount :
    //             sum - transaction.amount;
    //             return sum;
    //           },
    //           account.initialBalance
    //       );
    //       if (sumWithoutGrouping < 0)
    //         throw (new Error(ACCOUNT_BALANCE));
    //     });
    //     return next();
    //   })
    //   .catch(error => next(error));
  });

  groupingSchema.pre('remove', function (next) {
    const Transaction = mongoose.model('Transaction');

    Transaction.remove({
        grouping: this
      })
      .then(() => next())
      .catch(error => next(error));
  });

  mongoose.model('Grouping', groupingSchema);
};