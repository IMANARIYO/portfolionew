import api from "./api";

export const createComment = async (blogId, commentData) => {
  const response = await api.post(`/comments/${blogId}`, commentData);
  return response.data;
};

export const getCommentsForBlog = async (blogId) => {
  const response = await api.get(`/comments/${blogId}`);
  return response.data;
};

export const updateCommentById = async (commentId, commentData) => {
  const response = await api.patch(`/comments/${commentId}`, commentData);
  return response.data;
};

export const deleteCommentById = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};
