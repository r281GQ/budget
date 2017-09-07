const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const config = require('./config')();

const PORT = process.env.PORT || 3000;

const app = express();

app.enable('trust proxy');

require('./services/cors')(app);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser(config.cookie_secret))

require('./services/session')(app);

app.use(passport.initialize());
app.use(passport.session());

require('./models/user')(mongoose);
require('./models/account')(mongoose);

require('./services/mongoose');
require('./services/passport');

require('./routes/auth')(app)(passport);
require('./routes/static')(app)(express);

app.listen(PORT, () =>
  console.log(`Rest API and websockets started on port: ${PORT}`)
);
