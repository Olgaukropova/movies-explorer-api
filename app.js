require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

// eslint-disable-next-line import/no-unresolved
const routes = require('./routes');
const authRoutes = require('./routes/login');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
}).then(() => console.log('Connected!')).catch((e) => console.error(e));

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(auth);

app.use(authRoutes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Слушаю порт 3000');
});
