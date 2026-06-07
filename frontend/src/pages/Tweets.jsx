import { useState, useEffect } from 'react';
import { getUserTweets } from '../services/tweetService';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/common/Loader';
import TweetCard from '../components/tweet/TweetCard';
import TweetForm from '../components/tweet/TweetForm';
import TweetReplies from '../components/tweet/TweetReplies';
import './Tweets.css';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [repliesForTweet, setRepliesForTweet] = useState(null);
  const { user } = useAuth();

  const fetchTweets = async () => {
    try {
      const { data } = await getUserTweets(user._id);
      setTweets(data.data?.tweet || []);
    } catch {
      setTweets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTweets();
  }, [user]);

  if (loading) return <PageLoader />;

  return (
    <div className="page-container">
      <h1 className="page-title">Community</h1>

      <TweetForm onPosted={fetchTweets} />

      {repliesForTweet && (
        <TweetReplies tweetId={repliesForTweet} onClose={() => setRepliesForTweet(null)} />
      )}

      <div className="tweet-list">
        {tweets.length === 0 ? (
          <p className="dashboard-empty">No posts yet. Share something with the community!</p>
        ) : (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              tweetOwner={user}
              onRefresh={fetchTweets}
              onShowReplies={(id) => setRepliesForTweet(repliesForTweet === id ? null : id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Tweets;
