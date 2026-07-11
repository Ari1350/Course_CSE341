import express from 'express';
import { getAllContacts, getSingleContact } from '../controllers/contacts.js';

const router = express.Router();

// Ruta para traer todos los contactos: GET /contacts
router.get('/', getAllContacts);

// Ruta para traer un solo contacto por ID: GET /contacts/:id
router.get('/:id', getSingleContact);

export default router;
