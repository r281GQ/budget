const { handleSignUp, handleIsEmailUnique } = require('./../services/auth');

module.exports = app => passport => {
  app.get('/api/auth/whoami', (request, response) => {
    !request.user
      ? response.status(401).send({ error: 'Unauthanticated!' })
      : response.status(200).send(request.user);
  });

  app.post(
    '/api/auth/local/login',
    passport.authenticate('local', {failureRedirect: '/api/auth/failure'}),
    (request, response) => {
      response.status(200).send({ message: 'Authanticated!' });
    }
  );


  app.get(
    '/api/auth/failure',
    (request, response) => {
      response.status(401).send({ error: 'Invalid credentials!' });
    }
  );

  app.get('/api/auth/logout', (request, response) => {
    request.session.destroy(
      error =>
        error
          ? response.status(500).send({})
          : response.status(200).send({ message: 'Successfully logged out!' })
    );
  });

  const signUpMiddleWare = (request, response, next) => {
    handleSignUp(request)
      .then(user => {
        next();
      })
      .catch(error => next(error));
  };

  app.post(
    '/api/auth/local/signup',
    signUpMiddleWare,
    passport.authenticate('local'),
    (request, response) => {
      response.status(200).send({ message: 'Authanticated!' });
    }
  );

  app.get('/api/auth/unique/:email', (request, response) => {
    handleIsEmailUnique(request)
      .then(result => response.status(200).send({ result }))
      .catch(error => console.log(error));
  });
};
