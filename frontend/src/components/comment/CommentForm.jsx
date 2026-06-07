import { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import './CommentForm.css';

const CommentForm = ({ onSubmit, placeholder = 'Add a comment...' }) => {
  const [content, setContent] = useState('');
  const [focused, setFocused] = useState(false);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
    setFocused(false);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <Avatar src={user?.avatar} name={user?.fullName} size={34} />
      <div className="comment-form-input-wrapper">
        <input
          type="text"
          className="comment-form-input"
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        {(focused || content) && (
          <div className="comment-form-actions">
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => { setContent(''); setFocused(false); }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary" disabled={!content.trim()}>
              <Send size={14} /> Comment
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
