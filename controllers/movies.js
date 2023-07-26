const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../errors/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      if (!movie || movie.length === 0) {
        throw new NotFoundError('Фильмы не найдены');
      }
      res.send(movie);
    })
    .catch(next);
};

const createFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Вы ввели некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteFilm = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Попытка удалить чужой фильм.'));
      }
      return Movie
        .deleteOne(movie)
        .then(() => res.send({ message: 'Фильм успешно удален.' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createFilm,
  deleteFilm,
};
