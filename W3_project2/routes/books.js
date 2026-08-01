import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/books.js';
import { isAuthenticated } from '../middleware/authenticate.js';

const router = express.Router();

// Middleware para verificar errores de validación
const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => ({ field: err.path, message: err.msg })) });
  }
  next();
};

// Reglas de validación para los 7 campos requeridos
const bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('authorId').notEmpty().withMessage('Author ID is required'),
  body('publicationYear').isNumeric().withMessage('Publication Year must be a number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('pageCount').isNumeric().withMessage('Page Count must be a number'),
  body('language').notEmpty().withMessage('Language is required')
];

// Rutas GET públicas (Cualquiera puede verlas sin loguearse)
router.get('/', getAllBooks);
router.get('/:id', getSingleBook);

// Rutas de Libros
router.post('/', isAuthenticated, bookValidationRules, validateInput, createBook);
router.put('/:id', isAuthenticated, bookValidationRules, validateInput, updateBook);
router.delete('/:id', isAuthenticated, deleteBook);

export default router;
