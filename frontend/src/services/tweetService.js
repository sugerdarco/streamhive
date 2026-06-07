import api from './api';

export const createTweet = (content, parentTweetId) => {
  if (parentTweetId) {
    return api.post(`/tweets/${parentTweetId}`, { content });
  }
  return api.post('/tweets', { content });
};

export const deleteTweet = (tweetId) => {
  return api.delete(`/tweets/${tweetId}`);
};

export const getUserTweets = (userId) => {
  return api.get(`/tweets/${userId}`);
};

export const getTweetComments = (tweetId) => {
  return api.get(`/tweets/c/${tweetId}`);
};
