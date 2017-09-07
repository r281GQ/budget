module.exports = app => {
  const router = require('express').Router();

  const authMiddleWare = require('./../services/auth_middleware');

  const {
    handleGetAllAccounts,
    handleDeleteAccount,
    handlePostAccount,
    handlePutAccount
  } = require('./../services/account');

  // router.get(`/${ACCOUNT_BASE_URL}`, handleGetAllAccounts);
  //

  router.use(authMiddleWare);

  app.use(router);

  router.post(`/api/account`, (request, response) => {
    handlePostAccount(request)
      .then(account => response.status(201).send(account))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.put(`/api/account/:id`, (request, response) => {
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

  router.get(`/api/account`, (request, response) => {
    handleGetAllAccounts(request)
      .then(account => response.status(200).send(account))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.delete(`/api/account/:id`, (request, response) => {
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
