const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const authorization = require('./middlewares/authorization');
const notFoundPage = require('./middlewares/notFoundPage');
const errorHandler = require('./middlewares/errorHandler');
const { validateAuthorization, validateUser } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const createUser = require('./routes/createUser');
const login = require('./routes/login');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', validateAuthorization, login);
app.use('/signup', validateUser, createUser);

app.use(authorization);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(notFoundPage);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
