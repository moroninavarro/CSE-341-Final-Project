const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL MOVIES
const getAll = async (req, res) => {
  try {
    const movies = await mongodb
      .getDatabase()
      .db()
      .collection('movies')
      .find()
      .toArray();

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE MOVIE
const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format" });
  }

  try {
    const movie = await mongodb
      .getDatabase()
      .db()
      .collection('movies')
      .findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE MOVIE
const createMovie = async (req, res) => {
  const movie = {
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    year: req.body.year,
    rating: req.body.rating,
    director: req.body.director,
    duration: req.body.duration
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('movies')
      .insertOne(movie);

    res.status(201).json({
      message: "Movie created",
      id: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE MOVIE
const updateMovie = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format" });
  }

  const updatedMovie = {
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    year: req.body.year,
    rating: req.body.rating,
    director: req.body.director,
    duration: req.body.duration
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('movies')
      .replaceOne({ _id: new ObjectId(id) }, updatedMovie);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format" });
  }

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('movies')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};