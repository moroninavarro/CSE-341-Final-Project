const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('categories').find();

    try{
        result.toArray().then((categories) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(categories);
        });
    } catch (err) {
        res.status(400).json({ message: err});
    }
};

const getSingle = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
    // res.status(400).json('Must use a valid book id to update a book.');
  
    //#swagger.tags=['Contacts']
    const categorieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('categories').find({_id: categorieId});
    try {
        result.toArray().then((categories) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(categories[0]);
        });
    } catch (err) {
        res.status(400).json({ message: err});
    }
} else {
    res.status(400).json("Invalid ID entered. Please try again.");
}
};


const createCategory = async(req, res) => {
    //#swagger.tags=['Contacts']
    const categories = {
        NameCategory: req.body.NameCategory, 
        Author: req.body.Author, 
        Pages: req.body.Pages 
    };
    try {
        const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
        if (response.aknowledged) {
            console.log((response.insertedId));
            res.status(204).send(response);
        }
    } catch (error) {
        res.status(500).json(response.error);
        res.json(response.errored || "An error ocurred. Please try again.");
    }

};

const updateBooks = async(req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to update a book.');
  
    const bookId = new ObjectId(req.params.id);
    const book = {
        NameBook: req.body.NameBook, 
        Author: req.body.Author, 
        Pages: req.body.Pages 
    };
    try{
        const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id:bookId }, book);
       if (response.modifiedCount > 0) {
           res.status(204).send();

    } 
    } catch (err) {
        res.status(400).json({ message: err});
    }
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the book.');
    }
};


const deleteBooks = async (req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to delete a book.');
  
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({_id:bookId});

    try{
        if (response.deletedCount > 0) {
            res.status(204).send();
        } 
        } catch (err) {
            res.status(400).json({ message: err});
        }
   } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the book.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createBooks,
    updateBooks,
    deleteBooks
};