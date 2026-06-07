import { useState, useEffect } from 'react';
import { getComments, addComment as addCommentApi } from '../../services/commentService';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './CommentSection.css';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const fetchComments = async () => {
    try {
      const { data } = await getComments(videoId);
      setComments(data.data || []);
    } catch {
      // no comments
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  const handleAddComment = async (content) => {
    try {
      await addCommentApi(videoId, content);
      showToast('Comment added!', 'success');
      fetchComments();
    } catch {
      showToast('Failed to add comment', 'error');
    }
  };

  return (
    <div className="comment-section" id="comment-section">
      <h3 className="comment-section-title">{comments.length} Comments</h3>
      {isAuthenticated && <CommentForm onSubmit={handleAddComment} />}
      <div className="comment-list">
        {loading ? (
          <p className="comment-loading">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="comment-empty">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} onRefresh={fetchComments} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
