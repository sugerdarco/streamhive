import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import FileUpload from '../common/FileUpload';
import { updateVideoDetails } from '../../services/videoService';
import { useToast } from '../../context/ToastContext';
import { Save } from 'lucide-react';
import './VideoEditModal.css';

const VideoEditModal = ({ isOpen, onClose, video, onUpdated }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState(video?.description || '');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim() && !thumbnail) {
      showToast('At least one field must be changed', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (title.trim()) formData.append('title', title.trim());
      if (description.trim()) formData.append('description', description.trim());
      if (thumbnail) formData.append('thumbnail', thumbnail);

      await updateVideoDetails(video._id, formData);
      showToast('Video updated!', 'success');
      onUpdated?.();
      onClose();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update video', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Video" size="md">
      <form className="video-edit-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="edit-desc">Description</label>
          <textarea
            id="edit-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Video description"
            className="video-edit-textarea"
            rows={4}
          />
        </div>
        <FileUpload accept="image/*" label="New Thumbnail (optional)" onChange={setThumbnail} id="edit-thumbnail" />
        <div className="video-edit-actions">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm" icon={Save} loading={loading}>Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default VideoEditModal;
