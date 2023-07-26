require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

// eslint-disable-next-line import/no-unresolved
const routes = require('./routes');
// const authRoutes = require('./routes/login');
const { MONGO, PORT } = require('./config/global.config');

const app = express();
app.use(cors);

mongoose.connect(MONGO, {
  useNewUrlParser: true,
}).then(() => console.log('Connected!')).catch((e) => console.error(e));

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(auth);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Слушается порт', PORT);
});
