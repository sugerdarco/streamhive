import { ThumbsUp, Trash2, MessageSquare } from 'lucide-react';
import { toggleTweetLike } from '../../services/likeService';
import { deleteTweet } from '../../services/tweetService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Avatar from '../common/Avatar';
import { formatDate } from '../../utils/formatters';
import './TweetCard.css';

const TweetCard = ({ tweet, tweetOwner, onRefresh, onShowReplies }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const owner = tweetOwner || tweet.owner;
  const isOwner = user?._id === owner?._id;

  const handleLike = async () => {
    try {
      await toggleTweetLike(tweet._id);
      showToast('Like toggled!', 'success');
    } catch {
      showToast('Failed to like', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await deleteTweet(tweet._id);
      showToast('Post deleted', 'success');
      onRefresh?.();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="tweet-card glass animate-fade-in-up">
      <div className="tweet-card-header">
        <Avatar src={owner?.avatar} name={owner?.fullName || owner?.username} size={36} />
        <div>
          <span className="tweet-author">{owner?.fullName || owner?.username}</span>
          <span className="tweet-date">{formatDate(tweet.createdAt)}</span>
        </div>
      </div>
      <p className="tweet-content">{tweet.content}</p>
      <div className="tweet-actions">
        <button className="comment-action-btn" onClick={handleLike}>
          <ThumbsUp size={14} /> Like
        </button>
        {onShowReplies && (
          <button className="comment-action-btn" onClick={() => onShowReplies(tweet._id)}>
            <MessageSquare size={14} /> Replies
          </button>
        )}
        {isOwner && (
          <button className="comment-action-btn comment-action-danger" onClick={handleDelete}>
            <Trash2 size={14} /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TweetCard;
