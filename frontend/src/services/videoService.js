import api from './api';

export const getAllVideos = (params) => {
  return api.get('/videos', { params });
};

export const getVideoById = (videoId) => {
  return api.get(`/videos/${videoId}`);
};

export const publishVideo = (formData) => {
  return api.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateVideoDetails = (videoId, formData) => {
  return api.patch(`/videos/${videoId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteVideo = (videoId) => {
  return api.delete(`/videos/${videoId}`);
};

export const togglePublishStatus = (videoId) => {
  return api.patch(`/videos/toggle/publish/${videoId}`);
};
