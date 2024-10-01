import api from "./api";

export const createContact = async (contactData) => {
  const response = await api.post('/contact/createContact', contactData);
  return response.data;
};

export const updateContactById = async (id, contactData) => {
  const response = await api.put(`/contact/replaycontact/${id}`, contactData);
  return response.data;
};

export const deleteContactById = async (id) => {
  const response = await api.delete(`/contact/deleteContact/${id}`);
  return response.data;
};

export const getAllContacts = async () => {
  const response = await api.get('/contact/getAllContacts');
  return response.data;
};

export const getContactById = async (id) => {
  const response = await api.get(`/contact/getContactById/${id}`);
  return response.data;
};
