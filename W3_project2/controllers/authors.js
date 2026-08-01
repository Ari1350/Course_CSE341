import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// GET ALL AUTHORS
export const getAllAuthors = async (req, res) => {
  try {
    const db = getDB();
    const authors = await db.collection('authors').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the author list', error: error.message });
  }
};

// GET SINGLE AUTHOR
export const getSingleAuthor = async (req, res) => {
  try {
    const db = getDB();
    const authorId = req.params.id;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: 'The format of the author ID is not valid.' });
    }
    const author = await db.collection('authors').findOne({ _id: new ObjectId(authorId) });
    if (!author) {
      return res.status(404).json({ message: 'Author not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the specified author', error: error.message });
  }
};

// POST - CREATE AUTHOR (Validation included)
export const createAuthor = async (req, res) => {
  try {
    const db = getDB();
    const author = {
      fullName: req.body.fullName,
      nationality: req.body.nationality,
      birthYear: Number(req.body.birthYear)
    };
    const response = await db.collection('authors').insertOne(author);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the author.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating the author', error: error.message });
  }
};

// PUT - UPDATE AUTHOR
export const updateAuthor = async (req, res) => {
  try {
    const db = getDB();
    const authorId = req.params.id;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: 'The format of the author ID is not valid.' });
    }
    const updatedAuthor = {
      fullName: req.body.fullName,
      nationality: req.body.nationality,
      birthYear: Number(req.body.birthYear)
    };
    const response = await db.collection('authors').replaceOne({ _id: new ObjectId(authorId) }, updatedAuthor);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found or no changes made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the author', error: error.message });
  }
};

// DELETE - REMOVE AUTHOR
export const deleteAuthor = async (req, res) => {
  try {
    const db = getDB();
    const authorId = req.params.id;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: 'The format of the author ID is not valid.' });
    }
    const response = await db.collection('authors').deleteOne({ _id: new ObjectId(authorId) });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the author', error: error.message });
  }
};
