import { useState } from 'react';
import { formatViews, formatDuration, formatDate } from '../../utils/formatters';
import { deleteVideo, togglePublishStatus } from '../../services/videoService';
import { useToast } from '../../context/ToastContext';
import VideoEditModal from '../video/VideoEditModal';
import Button from '../common/Button';
import { Trash2, ToggleLeft, ToggleRight, Edit3 } from 'lucide-react';
import './VideoManager.css';

const VideoManager = ({ videos, onRefresh }) => {
  const { showToast } = useToast();
  const [editingVideo, setEditingVideo] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Delete this video permanently?')) return;
    try {
      await deleteVideo(id);
      showToast('Video deleted', 'success');
      onRefresh?.();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handleToggle = async (id) => {
    try {
      await togglePublishStatus(id);
      showToast('Publish status toggled', 'success');
      onRefresh?.();
    } catch {
      showToast('Failed to toggle', 'error');
    }
  };

  if (!videos || videos.length === 0) {
    return <p className="video-manager-empty">You haven't uploaded any videos yet.</p>;
  }

  return (
    <>
      <div className="video-table animate-fade-in-up">
        <div className="video-table-header">
          <span>Video</span>
          <span>Views</span>
          <span>Duration</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {videos.map((video) => (
          <div key={video._id} className="video-table-row">
            <div className="video-table-info">
              <img src={video.thumbnail} alt={video.title} className="video-table-thumb" />
              <span className="truncate">{video.title}</span>
            </div>
            <span>{formatViews(video.views).replace(' views', '')}</span>
            <span>{formatDuration(video.duration)}</span>
            <span>{formatDate(video.createdAt)}</span>
            <span className={`video-status ${video.isPublish ? 'published' : 'draft'}`}>
              {video.isPublish ? 'Published' : 'Draft'}
            </span>
            <div className="video-table-actions">
              <button className="icon-btn" onClick={() => setEditingVideo(video)} title="Edit">
                <Edit3 size={16} />
              </button>
              <button className="icon-btn" onClick={() => handleToggle(video._id)} title="Toggle publish">
                {video.isPublish ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              </button>
              <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(video._id)} title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingVideo && (
        <VideoEditModal
          isOpen={!!editingVideo}
          onClose={() => setEditingVideo(null)}
          video={editingVideo}
          onUpdated={onRefresh}
        />
      )}
    </>
  );
};

export default VideoManager;
