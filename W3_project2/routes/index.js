import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import booksRouter from './books.js';
import authorsRouter from './authors.js';
import authRouter from './auth.js';

const require = createRequire(import.meta.url);
let swaggerDocument;

// Intentar cargar Swagger de forma segura para evitar caídas si el JSON no existe aún
try {
  swaggerDocument = require('../swagger-output.json');
} catch (e) {
  swaggerDocument = {};
}

const router = express.Router();

// 1. Ruta de Documentación de Swagger
if (Object.keys(swaggerDocument).length > 0) {
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerDocument));
}

// 2. Mensaje de bienvenida en la raíz
router.get('/', (req, res) => {
  res.send('Welcome to Project 2: Books and Authors Management API');
});

// 3. Rutas de la colección Books (Libros)
router.use('/auth', authRouter);
router.use('/books', booksRouter);
router.use('/authors', authorsRouter);

export default router;
