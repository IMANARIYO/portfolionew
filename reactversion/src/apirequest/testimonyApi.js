import api from "./api";

export const createTestimony = async (testimonyData,) => {
  const response = await api.post('/testimony/createTestimony', testimonyData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const getAllTestimonies = async () => {
  const response = await api.get('/testimony/getTestimony');
  return response.data;
};

export const getTestimonyById = async (id) => {
  const response = await api.get(`/testimony/getTestimony/${id}`);
  return response.data;
};

export const updateTestimonyById = async (id, testimonyData) => {
  const response = await api.put(`/testimony/updateTestimony/${id}`, testimonyData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const deleteTestimonyById = async (id) => {
  const response = await api.delete(`/testimony/deleteTestimony/${id}`);
  return response.data;
};
