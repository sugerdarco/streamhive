import { useState } from 'react';
import { createTweet } from '../../services/tweetService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Send } from 'lucide-react';
import './TweetForm.css';

const TweetForm = ({ parentTweetId, onPosted, placeholder = "What's on your mind?" }) => {
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      await createTweet(content.trim(), parentTweetId);
      showToast(parentTweetId ? 'Reply posted!' : 'Post published!', 'success');
      setContent('');
      onPosted?.();
    } catch {
      showToast('Failed to post', 'error');
    } finally {
      setPosting(false);
    }
  };

  return (
    <form className="tweet-form glass" onSubmit={handleSubmit}>
      <Avatar src={user?.avatar} name={user?.fullName} size={40} />
      <div className="tweet-form-body">
        <textarea
          className="tweet-input"
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <div className="tweet-form-footer">
          <span className="tweet-char-count">{content.length}/500</span>
          <Button type="submit" variant="primary" size="sm" icon={Send} loading={posting} disabled={!content.trim()}>
            {parentTweetId ? 'Reply' : 'Post'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
