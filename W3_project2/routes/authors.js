import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from '../controllers/authors.js';

const router = express.Router();

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => ({ field: err.path, message: err.msg })) });
  }
  next();
};

const authorValidationRules = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('nationality').notEmpty().withMessage('Nationality is required'),
  body('birthYear').isNumeric().withMessage('Birth year must be a number')
];

router.get('/', getAllAuthors);
router.get('/:id', getSingleAuthor);
router.post('/', authorValidationRules, validateInput, createAuthor);
router.put('/:id', authorValidationRules, validateInput, updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
