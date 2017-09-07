module.exports = app => {
  const router = require('express').Router();

  const authMiddleWare = require('./../services/auth_middleware')

  const {
    handleGetAllAccounts,
    handleDeleteAccount,
    handleGetAccount,
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
  // router.put(`/${ACCOUNT_BASE_URL}`, handlePutAccount);
  // router.delete(`/${ACCOUNT_BASE_URL}/:id`, handleDeleteAccount);
  // router.get(`/${ACCOUNT_BASE_URL}/:id`, handleGetAccount);
};
