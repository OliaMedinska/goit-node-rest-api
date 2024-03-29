
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById, 
} from "../services/contactsServices.js";

import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import HttpError from '../helpers/HttpError.js';
import validateBody from '../helpers/validateBody.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const removedContact = await removeContact(contactId);
    if (removedContact) {
      res.status(200).json(removedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const validationResult = createContactSchema.validate(req.body);

  if (validationResult.error) {
    return next(HttpError(400, validationResult.error.message));
  }

  try {
    validateBody(createContactSchema)(req, res, () => {});;
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json({
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const contactId = req.params.id;
  const updatedFields = req.body;
  try {
    validateBody(updateContactSchema)(req, res, () => {});

    if (Object.keys(updatedFields).length === 0) {
      throw HttpError(400, 'Body must have at least one field');
    }

    const updatedContact = await updateContactById(contactId, updatedFields); // Zmienione
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const contactId = req.params.id;
  const updatedFields = req.body;
  try {
    validateBody(updateContactSchema)(req, res, () => {});
    if (typeof updatedFields.favorite !== 'boolean') {
      throw HttpError(400, 'Invalid value for the "favorite" field');
    }

    const updatedContact = await updateContactById(contactId, updatedFields);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};