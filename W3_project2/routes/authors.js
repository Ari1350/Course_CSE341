import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from '../controllers/authors.js';
import { isAuthenticated } from '../middleware/authenticate.js';

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

// Rutas públicas
router.get('/', getAllAuthors);
router.get('/:id', getSingleAuthor);

router.post('/', isAuthenticated, authorValidationRules, validateInput, createAuthor);
router.put('/:id', isAuthenticated, authorValidationRules, validateInput, updateAuthor);
router.delete('/:id', isAuthenticated, deleteAuthor);

export default router;
