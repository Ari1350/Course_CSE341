import express from 'express';
import swaggerUi from 'swagger-ui-express';
import contactRoutes from './contacts.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger-output.json');

const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Mensaje de bienvenida requerido por las instrucciones de BYU-Idaho
router.get('/', (req, res) => {
    res.send('Hello World - Welcome to the Contacts API');
});

// Vinculamos todas las rutas de contactos de forma limpia
router.use('/contacts', contactRoutes);

export default router;
