import api from './api';

export const getChannelStats = () => {
  return api.get('/dashboard/stats');
};

export const getChannelVideos = () => {
  return api.get('/dashboard/videos');
};
