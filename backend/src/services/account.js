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

const handleGetAllAccounts = (request, response) => {
  return new Promise((resolve, reject) => {

    let accountsToSend;
    const user = extractUser(request);

    Account.find({ user })
    .sort({ name: 1 })
    .then(accounts => {
      accountsToSend = accounts;
      return Promise.all(
        accounts.map(account => {
          return account.currentBalance();
        })
      );
    })
    .then(currentBalances => {
      let reduced = accountsToSend.map(account =>
        pickPropertiesForAccount(account)
      );
      let prefixedCurrentBalances = currentBalances.map(currentBalance => {
        return { currentBalance };
      });
      resolve(_.merge(reduced, prefixedCurrentBalances));
    })
    .catch(error => {
      reject({ error: SERVER_ERROR });
    });
  })
};

const handlePutAccount = (request, response) => {
  return new Promise((resolve, reject) => {
    const { _id, name } = request.body;

    if (!idValidator(_id))
      return reject({ message: ID_INVALID_OR_NOT_PRESENT });

    const user = extractUser(request);

    let accountToSend;

    Account.findOne({ _id, user })
      .then(account => {
        if (!account) return Promise.reject({ message: RESOURCE_NOT_FOUND });

        return Account.findOneAndUpdate(
          { _id },
          { $set: { name } },
          { new: true }
        );
      })
      .then(account => {
        accountToSend = account;
        return account.currentBalance();
      })
      .then(currentBalance => {
        resolve(
          _.extend(pickPropertiesForAccount(accountToSend), {
            currentBalance
          })
        );
      })
      .catch(error => reject(error));
  });
};

const handlePostAccount = request =>
  new Promise((resolve, reject) => {
    const { name, initialBalance, currency } = request.body;

    const account = new Account({
      name,
      initialBalance,
      currency
    });

    account.user = extractUser(request);

    let accountToSend;

    account
      .save()
      .then(account => {
        accountToSend = account;
        return account.currentBalance();
      })
      .then(currentBalance => {
        const reducedAccount = pickPropertiesForAccount(accountToSend);
        reducedAccount.currentBalance = currentBalance;
        resolve(reducedAccount);
      })
      .catch(error => {
        reject(error);
      });
  });


const handleDeleteAccount = (request, response) => {
  const user = extractUser(request);
  const _id = request.params['id'];

  if (!idValidator(_id))
    return reject({ message: ID_INVALID_OR_NOT_PRESENT });

  Account.findOne({ _id, user })
    .then(account => {
      if (!account) return Promise.reject({ message: RESOURCE_NOT_FOUND });
      return account.remove();
    })
    .then(() => {
      return resolve.send({});
    })
    .catch(error => {
      return reject(error)
    });
};

module.exports = {
  handleGetAllAccounts,
  handlePutAccount,
  handlePostAccount,
  handleDeleteAccount
};
