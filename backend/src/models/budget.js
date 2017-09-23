module.exports = mongoose => {
  const _ = require('lodash');
  const moment = require('moment');

  const {
    currencyValidator
  } = require('./../services/validators');

  const Schema = mongoose.Schema;

  const budgetPeriodSchema = new Schema({
    month: {
      type: Date,
      required: true
    },
    allowance: {
      type: Number,
      required: true
    }
  });

  const budgetSchema = new Schema({
    defaultAllowance: {
      type: Number,
      required: true
    },
    name: {
      required: true,
      type: String
    },
    currency: {
      type: String,
      required: true,
      default: 'GBP',
      validate: {
        validator: currencyValidator
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    budgetPeriods: [budgetPeriodSchema],
    createdAt: {
      type: Date
    }
  });

  const calculateSum = (extendedBudgetPeriods, bp) => {
    let budgetPeriodFromLastIteration = _.last(extendedBudgetPeriods);

    let comulativeBalance = !budgetPeriodFromLastIteration ?
      0 :
      budgetPeriodFromLastIteration.comulativeBalance;

    extendedBudgetPeriods.push(
      _.extend({}, bp, {
        comulativeBalance: comulativeBalance + bp.monthlyBalance
      })
    );

    return extendedBudgetPeriods;
  };


  //TODO: lodash range
  // budgetSchema.methods.createInitialBudgetPeriods = function (startingMonth) {
  //   return new Promise((resolve, reject) => {
  //     const now = moment().valueOf();
  //     const monthsToCreate = [];

  //     if (startingMonth)
  //       while (!moment(startingMonth).isSame(now, 'month')) {
  //         monthsToCreate.push(startingMonth);
  //         startingMonth = moment(startingMonth).add(1, 'M');
  //       }

  //     monthsToCreate.push(now);

  //     this.budgetPeriods = monthsToCreate.map(month => ({
  //       month,
  //       allowance: this.defaultAllowance
  //     }));

  //     this.save()
  //       .then(budget => resolve(budget))
  //       .catch(error => reject(error));
  //   });
  // };

  budgetSchema.methods.assignBudgetPeriod = function (month) {
    return new Promise((resolve, reject) => {
      if (!month) reject({message: 'Month required!'});

      if (_.isEmpty(this.budgetPeriods))
        this.budgetPeriods.push({
          // month: moment(this._id.getTimestamp()).toDate(),
          month: moment(this.createdAt),
          allowance: this.defaultAllowance
        });

      const sortedBudgetPeriods = _.sortBy(this.budgetPeriods, ['month']);

      const firstPeriod = _.first(sortedBudgetPeriods);
      const lastPeriod = _.last(sortedBudgetPeriods);

      //if the month doesn't exist  
      if (!this.budgetPeriods.find(bp =>
          moment(bp.month).isSame(moment(month), 'M')
        )) {
        //the month is before the earliest month start adding month down
        if (moment(month).isBefore(firstPeriod.month, 'month')) {
          while (!moment(month).isSame(firstPeriod.month, 'month')) {
            this.budgetPeriods.push({
              month,
              allowance: this.defaultAllowance
            });
            month = moment(month).add(1, 'M');
          }
        } else {
          while (!moment(month).isSame(lastPeriod.month, 'month')) {
            this.budgetPeriods.push({
              month,
              allowance: this.defaultAllowance
            });
            month = moment(month).subtract(1, 'M');
          }
        }
      }

      this.save()
        .then(budget => resolve(budget))
        .catch(error => {console.log(error);reject(error)});
    });
  };

  budgetSchema.methods.balances = function () {
    const Transaction = mongoose.model('Transaction');
    const budget = this;
    const bps = budget.budgetPeriods;
    return new Promise((resolve, reject) => {
      Transaction.find({
          budget
        })
        .then(transactions => {
          const array = _.map(bps, bp =>
            _.extend({}, _.pick(bp, ['_id', 'allowance', 'month']), {
              monthlyBalance: _.reduce(
                  _.map(
                    _.filter(budget.budgetPeriods, bpToFilter =>
                      moment(bpToFilter.month).isSame(
                        moment(bp.month, 'DD-MM-YYYY'),
                        'month'
                      )
                    ),
                    bpToMap => bpToMap.allowance
                  ),
                  (sum, allowance) => sum + allowance,
                  0
                ) -
                _.reduce(
                  _.filter(transactions, transaction =>
                    moment(transaction.date).isSame(
                      moment(bp.month, 'DD-MM-YYYY'),
                      'month'
                    )
                  ),
                  (sum, transaction) => sum + transaction.amount,
                  0
                )
            })
          );
          const calculatedArray = _.reduce(
            _.sortBy(array, ['month']),
            calculateSum, []
          );
          resolve(_.keyBy(calculatedArray, '_id'));
        })
        .catch(error => reject(error));
    });
  };

  budgetSchema.pre('remove', function (next) {
    const Transaction = mongoose.model('Transaction');
    Transaction.update({
        budget: this
      }, {
        $unset: {
          budget: 1
        }
      })
      .then(() => next())
      .catch(error => next(error));
  });

  mongoose.model('Budget', budgetSchema);
};