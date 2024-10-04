import api from "./api";

// Import axios instance

const UserService = {
  // 1. Signup User
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 2. Login User
  login: async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 3. Forgot Password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forget', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 4. Reset Password with OTP
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await api.post('/auth/reset', {
        email,
        otp,
        newpassword: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 5. Change Password (Authenticated Route)
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change', {
        currentpassword: currentPassword,
        newpassword: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 6. Get All Users (Admin Route)
  getAllUsers: async () => {
    try {
      const response = await api.get('/auth/getAllUsers');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 7. Update User by ID (Admin Route)
  updateUserById: async (id, updatedData) => {
    try {
      const response = await api.patch(`/auth/updateUserById/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default UserService;
