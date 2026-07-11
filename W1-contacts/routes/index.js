import express from 'express';
import contactRoutes from './contacts.js';

const router = express.Router();

// Mensaje de bienvenida requerido por las instrucciones de BYU-Idaho
router.get('/', (req, res) => {
    res.send('Hello World - Welcome to the Contacts API');
});

// Vinculamos todas las rutas de contactos de forma limpia
router.use('/contacts', contactRoutes);

export default router;
