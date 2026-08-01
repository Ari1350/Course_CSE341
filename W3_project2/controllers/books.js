import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// GET ALL BOOKS
export const getAllBooks = async (req, res) => {
  try {
    const db = getDB();
    const books = await db.collection('books').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the book list', error: error.message });
  }
};

// GET SINGLE BOOK BY ID
export const getSingleBook = async (req, res) => {
  try {
    const db = getDB();
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'The format of the book ID is not valid.' });
    }

    const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });
    if (!book) {
      return res.status(404).json({ message: 'Book not found in the database.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the specified book', error: error.message });
  }
};

// POST - CREATE A BOOK (7 Required Fields)
export const createBook = async (req, res) => {
  try {
    const db = getDB();
    const book = {
      title: req.body.title,
      authorId: req.body.authorId,
      publicationYear: Number(req.body.publicationYear),
      genre: req.body.genre,
      isbn: req.body.isbn,
      pageCount: Number(req.body.pageCount),
      language: req.body.language
    };

    const response = await db.collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the book.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating the book', error: error.message });
  }
};

// PUT - UPDATE A BOOK BY ID
export const updateBook = async (req, res) => {
  try {
    const db = getDB();
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'The format of the book ID is not valid.' });
    }

    const updatedBook = {
      title: req.body.title,
      authorId: req.body.authorId,
      publicationYear: Number(req.body.publicationYear),
      genre: req.body.genre,
      isbn: req.body.isbn,
      pageCount: Number(req.body.pageCount),
      language: req.body.language
    };

    const response = await db.collection('books').replaceOne(
      { _id: new ObjectId(bookId) },
      updatedBook
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or no changes were made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the book', error: error.message });
  }
};

// DELETE - REMOVE A BOOK BY ID
export const deleteBook = async (req, res) => {
  try {
    const db = getDB();
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'The format of the book ID is not valid.' });
    }

    const response = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found in the database.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the book', error: error.message });
  }
};
