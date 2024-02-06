import { listContacts, getContactById, removeContact, addContact } from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import HttpError from '../helpers/HttpError.js';
import validateBody from '../helpers/validateBody.js';


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getOneContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const deleteContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const removedContact = await removeContact(contactId);
    if (removedContact) {
      res.status(200).json(removedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const createContact = async (req, res) => {
  try {
    validateBody(createContactSchema)(req, res, () => {});

    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message || 'Bad Request' });
    }
  }
};

export const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const updatedFields = req.body;
  try {
    validateBody(updateContactSchema)(req, res, () => {});

    if (Object.keys(updatedFields).length === 0) {
      throw new HttpError(400, 'Body must have at least one field');
    }

    const updatedContact = await updateContact(contactId, updatedFields);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message || 'Bad Request' });
    }
  }
};