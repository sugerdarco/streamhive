import api from './api';

export const createPlaylist = (data) => {
  return api.post('/playlists', data);
};

export const getAllPlaylists = () => {
  return api.get('/playlists/get-all');
};

export const getPlaylist = (playlistId) => {
  return api.get(`/playlists/${playlistId}`);
};

export const updatePlaylist = (playlistId, data) => {
  return api.patch(`/playlists/${playlistId}`, data);
};

export const deletePlaylist = (playlistId) => {
  return api.delete(`/playlists/${playlistId}`);
};

export const addVideoToPlaylist = (playlistId, videoId) => {
  return api.patch(`/playlists/${playlistId}/video?videoId=${videoId}`);
};

export const removeVideoFromPlaylist = (playlistId, videoId) => {
  return api.delete(`/playlists/${playlistId}/video?videoId=${videoId}`);
};
