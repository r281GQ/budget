const {handleSignUp} = require('./../services/auth');

module.exports = app => passport => {
  app.get('/api/auth/whoami', (request, response) => {
    if (!request.user)
      return response.status(401).send({ message: 'Unauthanticated!' });
    return response.status(200).send(request.user);
  });

  app.post(
    '/api/auth/local/login',
    passport.authenticate('local'),
    (request, response) => {
      response.status(200).send({ message: 'Authanticated!' });
    }
  );

  app.get('/api/auth/logout', (request, response) => {
    request.logout();
    request.session = null;
    return response.status(200).send({ messgae: 'Successfully logged out!' });
  });

  const signUpMiddleWare = (request, response, next) => {
    handleSignUp(request)
      .then(user => {
        console.log(user);
        next();
      })
      .catch(error => console.log(error));
  };

  app.post(
    '/api/auth/local/signup',
    signUpMiddleWare,
    passport.authenticate('local'),
    (request, response) => {
      response.status(200).send({ message: 'Authanticated!' });
    }
  );
};
