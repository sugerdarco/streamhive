import api from './api';

export const toggleVideoLike = (videoId) => {
  return api.post(`/likes/toggle/v/${videoId}`);
};

export const toggleCommentLike = (commentId) => {
  return api.post(`/likes/toggle/c/${commentId}`);
};

export const toggleTweetLike = (tweetId) => {
  return api.post(`/likes/toggle/t/${tweetId}`);
};

export const getLikedVideos = (params) => {
  return api.get('/likes/videos', { params });
};

export const getLikedComments = (params) => {
  return api.get('/likes/comments', { params });
};

export const getLikedTweets = (params) => {
  return api.get('/likes/tweets', { params });
};
