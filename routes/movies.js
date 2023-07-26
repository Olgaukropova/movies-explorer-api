const router = require('express').Router();
const { getMovies, createFilm, deleteFilm } = require('../controllers/movies');

const {
  validateCreateFilm,
  validateMovieId,
} = require('../middlewares/validations');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы

router.post(
  '/',
  validateCreateFilm,
  createFilm,
); // создаёт фильм

router.delete(
  '/:movieId',
  validateMovieId,
  deleteFilm,
); // удаляет сохранённый фильм по id

module.exports = router;
