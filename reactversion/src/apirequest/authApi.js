import api from "./api";

export const signupUser = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const sendOtpForPasswordReset = async (email) => {
  const response = await api.post('/auth/forget', { email });
  return response.data;
};

export const resetPassword = async (otp, newPassword) => {
  const response = await api.post('/auth/reset', { otp, newPassword });
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.post('/auth/change', passwordData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/auth/getAllUsers');
  return response.data;
};

export const updateUserById = async (id, updatedData) => {
  const response = await api.patch(`/auth/updateUserById/${id}`, updatedData);
  return response.data;
};
