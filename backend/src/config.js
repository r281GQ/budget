const ENVIRONMENT = process.env.NODE_ENV;

const TEST = 'test';
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

module.exports = () => {
  switch (ENVIRONMENT) {
    case PRODUCTION:
      return {
        mongodb: {
          uri: process.env.MONGODB_URI
        },
        cookie_secret: process.env.COOKIE_SECRET,
        session_config: {
          cookie: {
            secure: true
          },
          proxy: true,
          saveUninitialized: true,
          resave: true
        }
      };
    case DEVELOPMENT:
      return {
        mongodb: {
          uri: require('./../../config.json').dev.MONGODB.URI
        },
        cookie_secret: require('./../../config.json').dev.COOKIE_SECRET,
        session_config: {
          cookie: {
            secure: false
          },
          proxy: false,
          saveUninitialized: false,
          resave: false
        }
      };
    default:
      return {
        mongodb: {
          uri: require('./../../config.json').test.MONGODB.URI
        },
        cookie_secret: require('./../../config.json').test.COOKIE_SECRET,
        session_config: {
          cookie: {
            secure: false
          },
          proxy: false,
          saveUninitialized: false,
          resave: false
        }
      };
  }
};
