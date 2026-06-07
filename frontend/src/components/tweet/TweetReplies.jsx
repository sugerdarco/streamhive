import { useState, useEffect } from 'react';
import { getTweetComments } from '../../services/tweetService';
import TweetCard from './TweetCard';
import TweetForm from './TweetForm';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare } from 'lucide-react';
import './TweetReplies.css';

const TweetReplies = ({ tweetId, onClose }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchReplies = async () => {
    setLoading(true);
    try {
      const { data } = await getTweetComments(tweetId);
      setReplies(data.data || []);
    } catch {
      setReplies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tweetId) fetchReplies();
  }, [tweetId]);

  return (
    <div className="tweet-replies animate-fade-in-up">
      <div className="tweet-replies-header">
        <MessageSquare size={18} />
        <h3>Replies</h3>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
      </div>

      <TweetForm parentTweetId={tweetId} onPosted={fetchReplies} placeholder="Write a reply..." />

      <div className="tweet-replies-list">
        {loading ? (
          <p className="tweet-replies-loading">Loading replies...</p>
        ) : replies.length === 0 ? (
          <p className="tweet-replies-empty">No replies yet.</p>
        ) : (
          replies.map((reply) => (
            <TweetCard key={reply._id} tweet={reply} tweetOwner={reply.owner} onRefresh={fetchReplies} />
          ))
        )}
      </div>
    </div>
  );
};

export default TweetReplies;
