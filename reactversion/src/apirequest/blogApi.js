import api from "./api";

export const createBlog = async (blogData) => {
  const response = await api.post('/Blogs/createBlog', blogData);
  return response.data;
};

export const getAllBlogs = async () => {
  const response = await api.get('/Blogs/getBlogs');
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/Blogs/getBlog/${id}`);
  return response.data;
};

export const updateBlogById = async (id, blogData) => {
  const response = await api.put(`/Blogs/updateBlog/${id}`, blogData);
  return response.data;
};

export const deleteBlogById = async (id) => {
  const response = await api.delete(`/Blogs/deleteBlog/${id}`);
  return response.data;
};

export const likeBlogById = async (id) => {
  const response = await api.post(`/Blogs/likeBlog/${id}`);
  return response.data;
};

export const dislikeBlogById = async (id) => {
  const response = await api.post(`/Blogs/dislikeBlog/${id}`);
  return response.data;
};
