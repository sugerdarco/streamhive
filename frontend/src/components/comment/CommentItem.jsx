import { useState } from 'react';
import { ThumbsUp, Trash2, Edit3, MoreVertical } from 'lucide-react';
import { deleteComment, updateComment } from '../../services/commentService';
import { toggleCommentLike } from '../../services/likeService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Avatar from '../common/Avatar';
import { formatDate } from '../../utils/formatters';
import './CommentItem.css';

const CommentItem = ({ comment, onRefresh }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const owner = Array.isArray(comment.owner) ? comment.owner[0] : comment.owner;
  const isOwner = user?._id === owner?._id;

  const handleLike = async () => {
    try {
      await toggleCommentLike(comment._id);
      onRefresh();
    } catch {
      showToast('Failed to like', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this comment?')) return;
    try {
      await deleteComment(comment._id);
      showToast('Comment deleted', 'success');
      onRefresh();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateComment(comment._id, editContent);
      showToast('Comment updated', 'success');
      setEditing(false);
      onRefresh();
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  return (
    <div className="comment-item">
      <Avatar src={owner?.avatar} name={owner?.fullName || owner?.username} size={34} />
      <div className="comment-item-body">
        <div className="comment-item-header">
          <span className="comment-item-author">{owner?.fullName || owner?.username}</span>
          <span className="comment-item-date">{formatDate(comment.createdAt)}</span>
        </div>
        {editing ? (
          <div className="comment-edit">
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="comment-edit-input" />
            <div className="comment-edit-actions">
              <button className="btn btn-sm btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-sm btn-primary" onClick={handleUpdate}>Save</button>
            </div>
          </div>
        ) : (
          <p className="comment-item-content">{comment.content}</p>
        )}
        <div className="comment-item-actions">
          <button className="comment-action-btn" onClick={handleLike}>
            <ThumbsUp size={14} /> Like
          </button>
          {isOwner && (
            <>
              <button className="comment-action-btn" onClick={() => setEditing(true)}>
                <Edit3 size={14} /> Edit
              </button>
              <button className="comment-action-btn comment-action-danger" onClick={handleDelete}>
                <Trash2 size={14} /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
