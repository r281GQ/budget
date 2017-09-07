module.exports = app => {
  if (process.env.NODE_ENV === 'development')
    app.use(
      require('cors')({ credentials: true, origin: 'http://localhost:8080' })
    );
};
