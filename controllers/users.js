const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL USERS
const getAll = async (req, res) => {
  try {
    const users = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE USER
const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid ID format.");
  }

  try {
    const user = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role || "user"
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .insertOne(user);

    res.status(201).json({
      message: "User created",
      id: response.insertedId
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid ID format.");
  }

  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .replaceOne({ _id: new ObjectId(id) }, updatedUser);

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send();

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid ID format.");
  }

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};