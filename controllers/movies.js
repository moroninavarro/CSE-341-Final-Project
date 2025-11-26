const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('movies').find();

    try{
        result.toArray().then((movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies);
        });

    } catch (err) {
        res.status(400).json({ message: err});
    }
};

const getSingle = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
    // res.status(400).json('Must use a valid song id to update a song.');
  
    //#swagger.tags=['Contacts']
    const moviesId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({_id: moviesId});
    try{
        result.toArray().then((movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies[0]);
        });

    } catch (err) {
        res.status(400).json({ message: err});
    }
} else {
    res.status(400).json("Invalid ID entered. Please try again.");
}
};


const createMovies = async(req, res) => {
    //#swagger.tags=['Contacts']
    const movie = {
        NameMovie: req.body.NameMovie,  
        Author: req.body.Author, 
        duration: req.body.duration, 
        releaseDate: req.body.releaseDate, 
        genre: req.body.genre, 
        Language: req.body.Language, 
        classification: req.body.classification
    };

    try{
        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.aknowledged) {
            res.status(204).send();
        } 

    } catch (error) {
            res.status(500).json(response.error);
            res.json(response.errored || "An error ocurred. Please try again.");
        }
};

const updateMovies = async(req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to update a movie.');
  
    const moviesId = new ObjectId(req.params.id);
    const movie = {
        NameMovie: req.body.NameMovie,  
        Author: req.body.Author, 
        duration: req.body.duration, 
        releaseDate: req.body.releaseDate, 
        genre: req.body.genre, 
        Language: req.body.Language, 
        classification: req.body.classification
    };

    try{
        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({_id:moviesId }, movie);
       if (response.modifiedCount > 0) {
           res.status(204).send();
       } 

        } catch (err) {
            res.status(400).json({ message: err});
            }
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the movie.');
    }
};


const deleteMovies = async (req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to delete a movie.');
  
    const moviesId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({_id:moviesId });

    try{
        if (response.deletedCount > 0) {
            res.status(204).send();} 
            
        }   catch (err) {
        res.status(400).json({ message: err});
    }
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the movie.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovies,
    updateMovies,
    deleteMovies
};