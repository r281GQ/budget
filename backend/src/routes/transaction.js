module.exports = app => {
  const router = require('express').Router();

  const authMiddleWare = require('./../services/auth_middleware');

  const {
    ID_INVALID_OR_NOT_PRESENT,
    FORBIDDEN_RESOURCE,
    RESOURCE_NOT_FOUND,
    SERVER_ERROR,
    ACCOUNT_BALANCE,
    DEPENDENCIES_NOT_MET,
    BUDGET_INCOME_CONFLICT
  } = require('./../utils/errors');

  const {
    handleDeleteTransaction,
    handlePutTransaction,
    handlePostTransaction,
    handleGetAllTransactions
  } = require('./../services/transaction');

  router.use(authMiddleWare);

  app.use(`/api/transaction`, router);

  router.post('/', (request, response) => {
    handlePostTransaction(request)
      .then(transaction => response.status(201).send(transaction))
      .catch(error => {
        console.log(error);
        switch (error.error) {
          case ACCOUNT_BALANCE:
            return response.status(400).send({ error: ACCOUNT_BALANCE });
          case DEPENDENCIES_NOT_MET:
            return response.status(400).send({ error: DEPENDENCIES_NOT_MET });
          case BUDGET_INCOME_CONFLICT:
            return response.status(400).send({ error: BUDGET_INCOME_CONFLICT });
          case RESOURCE_NOT_FOUND:
            return response.status(400).send({ error: RESOURCE_NOT_FOUND });
          default:
            return response.status(500).send({ error: SERVER_ERROR });
        }
      });
  });

  router.put('/', (request, response) => {
    handlePutTransaction(request)
      .then(transaction => response.status(200).send(transaction))
      .catch(error => {
        switch (error.error) {
          case ACCOUNT_BALANCE:
            return response.status(400).send({ error: ACCOUNT_BALANCE });
          case DEPENDENCIES_NOT_MET:
            return response.status(400).send({ error: DEPENDENCIES_NOT_MET });
          case BUDGET_INCOME_CONFLICT:
            return response.status(400).send({ error: BUDGET_INCOME_CONFLICT });
          case RESOURCE_NOT_FOUND:
            return response.status(400).send({ error: RESOURCE_NOT_FOUND });
          default:
            return response.status(500).send({ error: SERVER_ERROR });
        }
      });
  });

  router.get('/', (request, response) => {
    handleGetAllTransactions(request)
      .then(transactions => response.status(200).send(transactions))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.delete(`/:_id`, (request, response) => {
    handleDeleteTransaction(request)
      .then(transaction => response.status(200).send(transaction))
      .catch(error => {
        console.log(error);
        switch (error.message) {
          case ACCOUNT_BALANCE:
            return response.status(400).send({ error: ACCOUNT_BALANCE });
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({ error: RESOURCE_NOT_FOUND });
          case FORBIDDEN_RESOURCE:
            return response.status(403).send({ error: FORBIDDEN_RESOURCE });
          default:
            return response.status(500).send({ error: SERVER_ERROR });
        }
      });
  });
};
