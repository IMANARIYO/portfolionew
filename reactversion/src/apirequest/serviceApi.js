import api from "./api";

export const createService = async (serviceData) => {
  const response = await api.post('/service/createService', serviceData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllServices = async () => {
  const response = await api.get('/service/readServices');
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await api.get(`/service/readServices/${id}`);
  return response.data;
};

export const updateServiceById = async (id, serviceData) => {
  const response = await api.put(`/service/updateService/${id}`, serviceData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const deleteServiceById = async (id) => {
  const response = await api.delete(`/service/deleteService/${id}`);
  return response.data;
};
