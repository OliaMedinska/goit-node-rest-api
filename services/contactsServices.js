import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

export async function listContacts() {
  return Contact.find();
}

export async function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndRemove(contactId);
}

export async function addContact(name, email, phone) {
  return Contact.create({ name, email, phone });
}

export async function updateContact(contactId, updatedFields) {
  return Contact.findByIdAndUpdate(contactId, updatedFields, { new: true });
}