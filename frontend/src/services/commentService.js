import api from './api';

export const getComments = (videoOrCommentId, params) => {
  return api.get(`/comments/${videoOrCommentId}`, { params });
};

export const addComment = (videoOrCommentId, content) => {
  return api.post(`/comments/${videoOrCommentId}`, { content });
};

export const updateComment = (commentId, content) => {
  return api.patch(`/comments/${commentId}`, { content });
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
