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
    handleGetAllGroupings,
    handleDeleteGrouping,
    handleGetGrouping,
    handlePostGrouping,
    handlePutGrouping
  } = require('./../services/grouping');

  router.use(authMiddleWare);

  app.use(`/api/grouping`, router);

  router.post('/', (request, response) => {
    handlePostGrouping(request)
      .then(grouping => response.status(201).send(grouping))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.put('/', (request, response) => {
    handlePutGrouping(request)
      .then(grouping => response.status(200).send(grouping))
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({ error: RESOURCE_NOT_FOUND });
          case ID_INVALID_OR_NOT_PRESENT:
            return response
              .status(409)
              .send({ error: ID_INVALID_OR_NOT_PRESENT });
          default:
            return response.status(500).send({ error: SERVER_ERROR });
        }
      });
  });

  router.get('/', (request, response) => {
    handleGetAllGroupings(request)
      .then(grouping => response.status(200).send(grouping))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.delete(`/:_id`, (request, response) => {
    handleDeleteGrouping(request)
      .then(() => response.status(200).send({}))
      .catch(error => {
        switch (error.message) {
          case ACCOUNT_BALANCE:
            return response.status(400).send({ error: ACCOUNT_BALANCE });
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({ error: RESOURCE_NOT_FOUND });
          case ID_INVALID_OR_NOT_PRESENT:
            return response
              .status(409)
              .send({ error: ID_INVALID_OR_NOT_PRESENT });
          default:
            return response.status(500).send({ error: SERVER_ERROR });
        }
      });
  });
};
