const path = require('path');

module.exports = app => express => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../../../build')));
  } else {
    app.get('/', (request, response) =>
      response.send({ message: 'main page' })
    );
  }

  app.get('*', (request, response) => {
    response.redirect('/');
  });
};
