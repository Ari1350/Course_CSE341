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
