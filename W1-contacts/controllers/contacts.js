import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const getAllContacts = async (req, res) => {
    try {
        const db = getDB();
        const contacts = await db.collection('contacts').find().toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the contact list', error: error.message });
    }
};

export const getSingleContact = async (req, res) => {
    try {
        const db = getDB();
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ message: 'The format of the contact ID is not valid.' });
        }

        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found in the database.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the specified contact', error: error.message });
    }
};
export const createContact = async (req, res) => {
  try {
    const db = getDB();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    
    const response = await db.collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the contact.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating the contact', error: error.message });
  }
};

// PUT - Actualizar un contacto existente
export const updateContact = async (req, res) => {
  try {
    const db = getDB();
    const contactId = req.params.id;
    
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'The format of the contact ID is not valid.' });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('contacts').replaceOne(
      { _id: new ObjectId(contactId) }, 
      updatedContact
    );

    if (response.modifiedCount > 0) {
      res.status(204).send(); // Estado 204 significa éxito sin contenido en la respuesta
    } else {
      res.status(404).json({ message: 'Contact not found or no changes were made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the contact', error: error.message });
  }
};

// DELETE - Eliminar un contacto
export const deleteContact = async (req, res) => {
  try {
    const db = getDB();
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'The format of the contact ID is not valid.' });
    }

    const response = await db.collection('contacts').deleteOne({ _id: new ObjectId(contactId) });

    if (response.deletedCount > 0) {
      res.status(204).send(); // Éxito al eliminar
    } else {
      res.status(404).json({ message: 'Contact not found in the database.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the contact', error: error.message });
  }
};