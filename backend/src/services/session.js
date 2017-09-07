
const createRedisClient = (isProduction, redisUrl) => {
  const redis = require('redis');
  if (isProduction) {
    const rtg = require('url').parse(redisUrl);
    const db = redis.createClient(rtg.port, rtg.hostname);
    db.auth(rtg.auth.split(':')[1]);
    return db;
  } else {
    return redis.createClient();
  }
};

const createSessionConfig = (config, client, redisStore) => {
  return {
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: config.session_config.cookie.secure,
      path: '/'
    },
    secret: config.cookie_secret,
    store: new redisStore({ client }),
    saveUninitialized: config.session_config.saveUninitialized,
    resave: config.session_config.resave,
    proxy: config.session_config.proxy
  };
};

module.exports = app => {
  const session = require('express-session');
  const redisStore = require('connect-redis')(session);

  const client = createRedisClient(
    process.env.NODE_ENV === 'production',
    process.env.REDISTOGO_URL
  );

  app.use(
    session(createSessionConfig(require('./../config')(), client, redisStore))
  );
};
