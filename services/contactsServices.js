import { promises as fs } from 'fs';
import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const contactsPath = path.resolve(__dirname, "../db/contacts.json");

export async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    return contacts;
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index !== -1) {
      const removedContact = contacts.splice(index, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
      return removedContact;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };

    const contactsData = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
    return newContact;
  } catch (error) {
    return null;
  }
};