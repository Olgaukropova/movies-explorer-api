const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./login');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Указанный путь не найден.')));

module.exports = router;
