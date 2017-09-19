const _ = require('lodash');

const mongoose = require('mongoose');

const Account = mongoose.model('Account');
const Grouping = mongoose.model('Grouping');
const Budget = mongoose.model('Budget');
const Transaction = mongoose.model('Transaction');

const extractUser = require('./../utils/extract_user');
const idValidator = require('./../utils/id_validator');
const {
  ID_INVALID_OR_NOT_PRESENT,
  FORBIDDEN_RESOURCE,
  RESOURCE_NOT_FOUND,
  SERVER_ERROR,
  ACCOUNT_BALANCE,
  DEPENDENCIES_NOT_MET,
  BUDGET_INCOME_CONFLICT
} = require('./../utils/errors');

const pickPropertiesForBudget = budget =>
  _.pick(budget, ['_id', 'name', 'currency', 'defaultAllowance']);

const handlePostBudget = request =>
  new Promise((resolve, reject) => {
    const { name, currency, defaultAllowance } = request.body;

    const budget = new Budget({
      name,
      currency,
      defaultAllowance
    });

    budget.user = extractUser(request);

    budget
      .save()
      .then(budget =>
        budget.balances().then(balances => {
          budget = pickPropertiesForBudget(budget);
          budget.budgetPeriods = balances;
          resolve(budget);
        })
      )
      .catch(error => {
        console.log(error)
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return reject({ error: RESOURCE_NOT_FOUND });
          default:
            return reject({ error: SERVER_ERROR });
        }
      });
  });

const handleGetAllBudgets = request =>
  new Promise((resolve, reject) =>
    Budget.find({ user: extractUser(request) })
      .then(budgets => {
        Promise.all(budgets.map(budget => budget.balances())).then(balances => {
          const budgetsToSend = _.merge(
            budgets.map(budget => pickPropertiesForBudget(budget)),
            balances.map(budgetPeriods => ({
              budgetPeriods
            }))
          );
          resolve(budgetsToSend);
        });
      })
      .catch(error => reject({ error: SERVER_ERROR }))
  );

const handlePutBudget = request =>
  new Promise((resolve, reject) => {
    const { _id, name } = request.body;


    Budget.findOneAndUpdate(
      { _id, user: extractUser(request) },
      { $set: { name } },
      { new: true }
    )
      .then(
        budget =>
          !budget
            ? Promise.reject({ message: RESOURCE_NOT_FOUND })
            : budget.balances().then(balances => {
                budget = pickPropertiesForBudget(budget);
                budget.budgetPeriods = balances;
                return resolve(budget);
              })
      )
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return reject({ error: RESOURCE_NOT_FOUND });
          default:
            return reject({ error: SERVER_ERROR });
        }
      });
  });

const handleDeleteBudget = request =>
  new Promise((resolve, reject) =>
    Budget.findOne({ _id: request.params['_id'], user: extractUser(request) })
      .then(
        budget =>
          !budget
            ? Promise.reject({ message: RESOURCE_NOT_FOUND })
            : budget.remove()
      )
      .then(budget => resolve(budget))
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return reject({ message: RESOURCE_NOT_FOUND });
          default:
            return reject({ message: SERVER_ERROR });
        }
      })
  );

const handleGetBudget = request =>
  new Promise((resolve, reject) =>
    Budget.findOne({ _id: request.params['_id'], user: extractUser(request) })
      .then(
        budget =>
          !budget
            ? Promise.reject({ message: RESOURCE_NOT_FOUND })
            : budget.balances().then(balances => {
                budget = pickPropertiesForBudget(budget);
                budget.budgetPeriods = balances;
                return resolve(budget);
              })
      )
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return reject({ error: RESOURCE_NOT_FOUND });
          default:
            return reject({ error: SERVER_ERROR });
        }
      })
  );

module.exports = {
  handlePostBudget,
  handleGetAllBudgets,
  handlePutBudget,
  handleDeleteBudget,
  handleGetBudget
};
