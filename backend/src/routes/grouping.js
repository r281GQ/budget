module.exports = app => {
  const router = require('express').Router();

  const authMiddleWare = require('./../services/auth_middleware');

  const {
    handleGetAllGroupings,
    handleDeleteGrouping,
    handleGetGrouping,
    handlePostGrouping,
    handlePutAGrouping
  } = require('./../services/grouping');

  // router.get(`/${ACCOUNT_BASE_URL}`, handleGetAllAccounts);
  //

  router.use(authMiddleWare);


  router.post(`/api/grouping`, (request, response) => {
    handlePostGrouping(request)
      .then(account => response.status(201).send(account))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.put(`/api/grouping/:id`, (request, response) => {
    handlePutGrouping(request)
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

  router.get(`/api/grouping`, (request, response) => {
    handleGetAllGroupings(request)
      .then(account => response.status(200).send(account))
      .catch(error => response.status(500).send({ error: SERVER_ERROR }));
  });

  router.delete(`/api/grouping/:id`, (request, response) => {
    handleDeleteGrouping(request)
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
  app.use(router);
};
