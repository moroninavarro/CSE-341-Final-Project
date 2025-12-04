const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL REVIEWS
const getAll = async (req, res) => {
  try {
    const reviews = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .find()
      .toArray();

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE REVIEW
const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const review = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .findOne({ _id: new ObjectId(id) });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const review = {
      movieId: new ObjectId(req.body.movieId),
      userId: new ObjectId(req.body.userId),
      rating: req.body.rating,
      reviewText: req.body.reviewText
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .insertOne(review);

    res.status(201).json({
      message: "Review created",
      id: result.insertedId
    });
  } catch (err) {
    res.status(412).json({ 
      success: false,
      message: err.message,
    data:err });
  }
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  
  try {
  const updatedReview = {
    movieId: new ObjectId(req.body.movieId),
    userId: new ObjectId(req.body.userId),
    rating: req.body.rating,
    reviewText: req.body.reviewText
  };
  
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .replaceOne({ _id: new ObjectId(id) }, updatedReview);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('reviews')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createReview,
  updateReview,
  deleteReview
};