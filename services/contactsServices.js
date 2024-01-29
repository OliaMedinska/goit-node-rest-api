const fs = require('fs').promises;
const path = require('path');
const { json } = require('stream/consumers');

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(contactsData);
        return contacts;
      } catch (error) {
        return [];
      }
  }
  
  async function getContactById(contactId) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(contactsData);
        const contact = contacts.find((c) => c.id === contactId);
        return contact || null;
    } catch (error) {
        return null;
    }
  }
  
  async function removeContact(contactId) {
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
  
  async function addContact(name, email, phone) {
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
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
