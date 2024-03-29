
import { Contact } from '../models/contacts.js';

export async function listContacts() {
  return Contact.find();
}

export async function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findOneAndDelete({ _id: contactId });
}

export async function addContact(name, email, phone) {
  return Contact.create({ name, email, phone });
}

export async function updateContactById(contactId, updatedFields) {
  return Contact.findByIdAndUpdate(contactId, updatedFields, { new: true });
}