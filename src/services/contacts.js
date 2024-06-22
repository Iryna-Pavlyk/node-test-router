import { Contact } from '../db/models/contacts.js';

export const getAllContacts = () => Contact.find();

// export const getAllContacts = async () => {
//   const contacts = await Contact.find();
//   return contacts;
// };

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (data) => Contact.create(data);

export const deleteContact = (contactId) =>
  Contact.findOneAndDelete({ _id: contactId });

export const updateContact = async (contactId, data, options = {}) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
