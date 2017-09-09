const _ = require('lodash');
const mongoose = require('mongoose');
const extractUser = require('./../utils/extract_user');
const idValidator = require('./../utils/id_validator');

// const {
//   Transaction,
//   Grouping,
//   Account,
//   Budget,
//   Equity
// } = require('./../../db/models');
const {
  ID_INVALID_OR_NOT_PRESENT,
  FORBIDDEN_RESOURCE,
  RESOURCE_NOT_FOUND,
  SERVER_ERROR,
  ACCOUNT_BALANCE,
  DEPENDENCIES_NOT_MET,
  BUDGET_INCOME_CONFLICT
} = require('./../utils/errors');

const Transaction = mongoose.model('Transaction');
const Grouping = mongoose.model('Grouping');
const Account = mongoose.model('Account');
const Budget = mongoose.model('Budget');
const Equity = mongoose.model('Equity');

const handleGetAllTransactions = (request, response) =>
  new Promise((resolve, reject) => {
    let user = extractUser(request);

    Transaction.find({ user }).populate('account grouping equity budget')
      .sort({ date: 1 })
      .then(transactions => {
        return resolve(transactions);
      })
      .catch(error => {
        return response.status(500).send({ error: SERVER_ERROR });
      });
  });

const handlePutTransaction = (request, response) => {
  return new Promise((resolve, reject) => {
    let user = extractUser(request);
    let {
      _id,
      name,
      amount,
      grouping,
      account,
      equity,
      budget,
      currency
    } = request.body;

    if (
      !idValidator(_id) ||
      !idValidator(grouping) ||
      !idValidator(account) ||
      (budget && !idValidator(budget)) ||
      (equity && !idValidator(equity))
    )
      return reject({ error: ID_INVALID_OR_NOT_PRESENT });

    let newTransaction = {
      _id,
      name,
      amount,
      grouping,
      account,
      equity,
      budget,
      currency
    };

    let transaction, new_account, new_grouping, date;

    Promise.all([
      Transaction.findOne({ _id, user }).populate('account grouping'),
      Account.findOne({ _id: account, user }),
      Grouping.findOne({ _id: grouping, user })
    ])
      .then(queries => {
        transaction = queries[0];
        new_account = queries[1];
        grouping = new_grouping = queries[2];
        if (!transaction || !new_account || !new_grouping)
          return Promise.reject({ message: RESOURCE_NOT_FOUND });
        date = transaction.date;
        return Promise.all([
          new_account.currentBalance(),
          transaction.account.currentBalance()
        ]);
      })
      .then(balances => {
        let oldBalance = balances[1];
        let newBalance = balances[0];

        let oldAccount = transaction.account;
        let oldGrouping = transaction.grouping;

        const areAccountstheSame = oldAccount._id.equals(new_account._id);

        const areGroupingsstheSame = oldGrouping.type === new_grouping.type;

        const isOldGroupingIncome = oldGrouping.type === 'income';

        const isNewGroupingIncome = new_grouping.type === 'income';

        let newAmount = amount;
        let oldAmount = transaction.amount;

        if (areAccountstheSame && areGroupingsstheSame && isNewGroupingIncome)
          return oldBalance - (oldAmount - newAmount) > 0
            ? Transaction.remove({ _id })
            : Promise.reject({ message: ACCOUNT_BALANCE });

        if (areAccountstheSame && areGroupingsstheSame && !isNewGroupingIncome)
          return oldBalance - (newAmount - oldAmount) >= 0
            ? Transaction.remove({ _id })
            : Promise.reject({ message: ACCOUNT_BALANCE });

        if (
          areAccountstheSame &&
          !areGroupingsstheSame &&
          isOldGroupingIncome &&
          !isNewGroupingIncome
        )
          return oldBalance - (newAmount + oldAmount) > 0
            ? Transaction.remove({ _id })
            : Promise.reject({ message: ACCOUNT_BALANCE });

        if (
          areAccountstheSame &&
          !areGroupingsstheSame &&
          !isOldGroupingIncome &&
          isNewGroupingIncome
        )
          return Transaction.remove({ _id });

        if (!areAccountstheSame && areGroupingsstheSame && isOldGroupingIncome)
          return oldBalance - oldAmount > 0
            ? Transaction.remove({ _id })
            : Promise.reject({ message: ACCOUNT_BALANCE });

        if (!areAccountstheSame && areGroupingsstheSame && !isOldGroupingIncome)
          return newBalance - newAmount >= 0
            ? Transaction.remove({ _id })
            : Promise.reject({ message: ACCOUNT_BALANCE });

        if (
          !areAccountstheSame &&
          !areGroupingsstheSame &&
          !isOldGroupingIncome &&
          isNewGroupingIncome
        )
          return Transaction.remove({ _id });

        if (
          !areAccountstheSame &&
          !areGroupingsstheSame &&
          isOldGroupingIncome &&
          !isNewGroupingIncome
        )
          return newBalance - newAmount >= 0 && oldBalance - oldAmount >= 0
            ? Transaction.remove({ _id })
            : Promise.reject({ message: ACCOUNT_BALANCE });
      })
      .then(() => {
        let toCreate = new Transaction({
          _id,
          name,
          date,
          amount
        });

        toCreate.account = account;
        toCreate.grouping = grouping;
        toCreate.user = user;

        if (budget) toCreate.budget = budget;
        if (equity) toCreate.equity = equity;

        return toCreate.save();
      })
      .then(updatedTransaction => Transaction.findOne({ _id, user }).populate('account grouping'))
      .then(updatedTransaction => {
        const toSend = _.pick(updatedTransaction, [
          '_id',
          'name',
          'amount',
          'memo',
          'date',
          'currency',
          'account',
          'grouping',
          'budget',
          'equity'
        ]);
        // toSend.grouping = updatedTransaction.grouping._id;
        return resolve(toSend);
      })
      .catch(error => {
        switch (error.message) {
          case ACCOUNT_BALANCE:
            return reject({ error: ACCOUNT_BALANCE });
          case DEPENDENCIES_NOT_MET:
            return reject({ error: DEPENDENCIES_NOT_MET });
          case BUDGET_INCOME_CONFLICT:
            return reject({ error: BUDGET_INCOME_CONFLICT });
          case RESOURCE_NOT_FOUND:
            return reject({ error: RESOURCE_NOT_FOUND });
          default:
            return reject({ error: SERVER_ERROR });
        }
      });
  });
};

const handlePostTransaction = (request, response) => {
  return new Promise((resolve, reject) => {
    let user = extractUser(request);
    let {
      name,
      amount,
      grouping,
      account,
      equity,
      budget,
      currency,
      memo
    } = request.body;

    let transaction = new Transaction({
      name,
      amount,
      memo,
      currency
    });

    transaction.user = user;
    transaction.account = account;
    transaction.grouping = grouping;

    if (budget) transaction.budget = budget;
    if (equity) transaction.equity = equity;

    if (
      !idValidator(grouping) ||
      !idValidator(account) ||
      (budget && !idValidator(budget)) ||
      (equity && !idValidator(equity))
    )
      return reject({ message: ID_INVALID_OR_NOT_PRESENT });

    transaction
      .save()
      .then(({_id}) => Transaction.findOne({ _id, user }).populate('account grouping'))
      .then(transaction => {
        const toSend = _.pick(transaction, [
          '_id',
          'name',
          'amount',
          'memo',
          'date',
          'currency',
          'account',
          'grouping',
          'budget',
          'equity'
        ]);
        return resolve(toSend);
      })
      .catch(error => {
        console.log(error);
        switch (error.message) {
          case ACCOUNT_BALANCE:
            return reject({ error: ACCOUNT_BALANCE });
          case DEPENDENCIES_NOT_MET:
            return reject({ error: DEPENDENCIES_NOT_MET });
          case BUDGET_INCOME_CONFLICT:
            return reject({ error: BUDGET_INCOME_CONFLICT });
          case RESOURCE_NOT_FOUND:
            return reject({ error: RESOURCE_NOT_FOUND });
          default:
            return reject({ error: SERVER_ERROR });
        }
      });
  });
};

const handleDeleteTransaction = (request, response) => {
  return new Promise((resolve, reject) => {
    let user = extractUser(request);
    const _id = request.params['_id'];
    if (!idValidator(_id)) return reject({ error: ID_INVALID_OR_NOT_PRESENT });

    Transaction.findOne({ _id, user })
      .then(transaction => {
        if (!transaction)
          return Promise.reject({ message: RESOURCE_NOT_FOUND });
        if (!transaction.user.equals(user))
          return Promise.reject({ message: FORBIDDEN_RESOURCE });
        return transaction.remove();
      })
      .then(() => {
        return resolve({});
      })
      .catch(error => {
        console.log(error);
        switch (error.message) {
          case ACCOUNT_BALANCE:
            return reject({ message: ACCOUNT_BALANCE });
          case RESOURCE_NOT_FOUND:
            return reject({ message: RESOURCE_NOT_FOUND });
          case FORBIDDEN_RESOURCE:
            return reject({ message: FORBIDDEN_RESOURCE });
          default:
            return reject({ message: SERVER_ERROR });
        }
      });
  });
};
module.exports = {
  handleDeleteTransaction,
  handlePutTransaction,
  handlePostTransaction,
  handleGetAllTransactions
};
