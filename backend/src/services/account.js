const _ = require('lodash');

const mongoose = require('mongoose');

const Account = mongoose.model('Account');
const extractUser = require('./../utils/extract_user');
const idValidator = require('./../utils/id_validator');

const {
  ID_INVALID_OR_NOT_PRESENT,
  RESOURCE_NOT_FOUND,
  SERVER_ERROR
} = require('./../utils/errors');

const pickPropertiesForAccount = account =>
  _.pick(account, ['_id', 'name', 'initialBalance']);

const handleGetAllAccounts = request =>
  new Promise((resolve, reject) =>
    Account.find({ user: extractUser(request) })
      .sort({ name: 1 })
      .then(accounts => {
        Promise.all(
          accounts.map(account => account.currentBalance())
        ).then(currentBalances => {
          let reduced = accounts.map(account =>
            pickPropertiesForAccount(account)
          );
          let prefixedCurrentBalances = currentBalances.map(currentBalance => {
            return { currentBalance };
          });
          resolve(_.merge(reduced, prefixedCurrentBalances));
        });
      })
      .catch(error => {
        reject({ error: SERVER_ERROR });
      })
  );

const handlePutAccount = request =>
  new Promise((resolve, reject) => {
    const { _id, name } = request.body;

    if (!idValidator(_id))
      return reject({ message: ID_INVALID_OR_NOT_PRESENT });

    Account.findOne({ _id, user: extractUser(request) })
      .then(
        account =>
          !account
            ? Promise.reject({ message: RESOURCE_NOT_FOUND })
            : Account.findOneAndUpdate(
                { _id },
                { $set: { name } },
                { new: true }
              )
      )
      .then(account =>
        account.currentBalance().then(currentBalance =>
          resolve(
            _.extend(pickPropertiesForAccount(account), {
              currentBalance
            })
          )
        )
      )
      .catch(error => reject(error));
  });

const handlePostAccount = request =>
  new Promise((resolve, reject) => {
    const { name, initialBalance, currency } = request.body;

    const account = new Account({
      name,
      initialBalance,
      currency
    });

    account.user = extractUser(request);

    account
      .save()
      .then(account =>
        account.currentBalance().then(currentBalance => {
          const reducedAccount = pickPropertiesForAccount(account);
          reducedAccount.currentBalance = currentBalance;
          resolve(reducedAccount);
        })
      )
      .catch(error => {
        reject(error);
      });
  });

const handleDeleteAccount = request =>
  new Promise((resolve, reject) => {
    const user = extractUser(request);
    const _id = request.params._id;

    if (!idValidator(_id))
      return reject({ message: ID_INVALID_OR_NOT_PRESENT });

    Account.findOne({ _id, user })
      .then(
        account =>
          !account
            ? Promise.reject({ message: RESOURCE_NOT_FOUND })
            : account.remove()
      )
      .then(account => resolve(account))
      .catch(error => reject(error));
  });

module.exports = {
  handleGetAllAccounts,
  handlePutAccount,
  handlePostAccount,
  handleDeleteAccount
};
