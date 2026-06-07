import api from './api';

export const registerUser = (formData) => {
  return api.post('/users/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const loginUser = (credentials) => {
  return api.post('/users/login', credentials);
};

export const logoutUser = () => {
  return api.post('/users/logout');
};

export const refreshToken = (refreshToken) => {
  return api.post('/users/refresh-token', { refreshToken });
};
