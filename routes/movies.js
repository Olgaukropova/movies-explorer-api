const router = require('express').Router();
const { getMovies, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы

router.post('/', createFilm); // создаёт фильм

router.delete('/:id', deleteFilm); // удаляет сохранённый фильм по id

module.exports = router;
