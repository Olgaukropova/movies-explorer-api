const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { ObjectId } = require('mongodb');

function validator(v) {
  // return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
  return /^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s]*$/.test(v);
}

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: validator,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: validator,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: validator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    default() {
      return new ObjectId();
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
