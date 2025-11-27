const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL CATEGORIES
const getAll = async (req, res) => {
  try {
    const categories = await mongodb
      .getDatabase()
      .db()
      .collection('categories')
      .find()
      .toArray();

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE CATEGORY
const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const category = await mongodb
      .getDatabase()
      .db()
      .collection('categories')
      .findOne({ _id: new ObjectId(id) });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CATEGORY
const createCategory = async (req, res) => {
  const category = {
    NameCategory: req.body.NameCategory,
    description: req.body.description
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('categories')
      .insertOne(category);

    res.status(201).json({
      message: "Category created",
      id: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const updatedCategory = {
    NameCategory: req.body.NameCategory,
    description: req.body.description
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('categories')
      .replaceOne({ _id: new ObjectId(id) }, updatedCategory);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('categories')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory
};