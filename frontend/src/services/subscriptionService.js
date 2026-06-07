import api from './api';

export const toggleSubscription = (channelId) => {
  return api.post(`/subscriptions/c/${channelId}`);
};

export const getSubscribers = () => {
  return api.get('/subscriptions/subscribers');
};

export const getSubscribedChannels = () => {
  return api.get('/subscriptions/channels');
};
