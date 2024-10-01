import api from "./api";

export const getAllProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);

  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProjectById = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProjectById = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};
