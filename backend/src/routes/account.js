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
    handleGetAllAccounts,
    handleDeleteAccount,
    handlePostAccount,
    handlePutAccount
  } = require('./../services/account');

  // router.get(`/${ACCOUNT_BASE_URL}`, handleGetAllAccounts);
  //

  router.use(authMiddleWare);

  app.use('/api/account', router);

  router.post('/',(request, response) => {
    handlePostAccount(request)
      .then(account => response.status(201).send(account))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.put('/',(request, response) => {
    handlePutAccount(request)
      .then(account => response.status(200).send(account))
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

  router.get('/',(request, response) => {
    handleGetAllAccounts(request)
      .then(account => response.status(200).send(account))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.delete(`/:_id`, (request, response) => {
    handleDeleteAccount(request)
      .then(() => response.status(200).send({}))
      .catch(error => {
        switch (error.message) {
          case RESOURCE_NOT_FOUND:
            return response.status(404).send({ error: RESOURCE_NOT_FOUND });
            case ID_INVALID_OR_NOT_PRESENT:
          return   response.status(409).send({ error: ID_INVALID_OR_NOT_PRESENT })
          default:
            return response.status(500).send({ error: SERVER_ERROR });
        }
      });
  });

  // router.put(`/${ACCOUNT_BASE_URL}`, handlePutAccount);
  // router.delete(`/${ACCOUNT_BASE_URL}/:id`, handleDeleteAccount);
  // router.get(`/${ACCOUNT_BASE_URL}/:id`, handleGetAccount);
};
