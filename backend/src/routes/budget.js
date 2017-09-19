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
    handlePostBudget,
    handleGetAllBudgets,
    handleGetBudget,
    handlePutBudget,
    handleDeleteBudget
  } = require('./../services/budget');

  router.use(authMiddleWare);

  app.use('/api/budget', router);

  router.post('/', (request, response) => {
    handlePostBudget(request)
      .then(budget => response.status(201).send(budget))
      .catch(error => response.status(500).send({
        error: SERVER_ERROR
      }));
  });

  router.put('/', (request, response) => {
    handlePutBudget(request)
      .then(budget => response.status(200).send(budget))
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({
              error: RESOURCE_NOT_FOUND
            });
          case ID_INVALID_OR_NOT_PRESENT:
            return response
              .status(409)
              .send({
                error: ID_INVALID_OR_NOT_PRESENT
              });
          default:
            return response.status(500).send({
              error: SERVER_ERROR
            });
        }
      });
  });

  router.get('/', (request, response) => {
    handleGetAllBudgets(request)
      .then(budget => response.status(200).send(budget))
      .catch(error => response.status(500).send({
        error: SERVER_ERROR
      }));
  });

  router.delete(`/:_id`, (request, response) => {
    handleDeleteBudget(request)
      .then(budget => response.status(200).send(budget))
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({
              error: RESOURCE_NOT_FOUND
            });
          case ID_INVALID_OR_NOT_PRESENT:
            return response
              .status(409)
              .send({
                error: ID_INVALID_OR_NOT_PRESENT
              });
          default:
            return response.status(500).send({
              error: SERVER_ERROR
            });
        }
      });
  });

  router.get(`/:_id`, (request, response) => {
    handleGetBudget(request)
      .then(budget => response.status(200).send(budget))
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({
              error: RESOURCE_NOT_FOUND
            });
          case ID_INVALID_OR_NOT_PRESENT:
            return response
              .status(409)
              .send({
                error: ID_INVALID_OR_NOT_PRESENT
              });
          default:
            return response.status(500).send({
              error: SERVER_ERROR
            });
        }
      });
  });
};