import express from 'express';
import { getAllContacts, getSingleContact, createContact,updateContact,deleteContact } from '../controllers/contacts.js';

const router = express.Router();

// Ruta para traer todos los contactos: GET /contacts
router.get('/', getAllContacts);

// Ruta para crear un nuevo contacto: POST /contacts
router.post('/', createContact);

// Ruta para actualizar un contacto existente: PUT /contacts/:id
router.put('/:id', updateContact);

// Ruta para eliminar un contacto: DELETE /contacts/:id
router.delete('/:id', deleteContact);

// Ruta para traer un solo contacto por ID: GET /contacts/:id
router.get('/:id', getSingleContact);

export default router;
