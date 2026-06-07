import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { createPlaylist, updatePlaylist } from '../../services/playlistService';
import { useToast } from '../../context/ToastContext';
import { Save, Plus } from 'lucide-react';
import './PlaylistModal.css';

const PlaylistModal = ({ isOpen, onClose, playlist, onSaved }) => {
  const isEdit = !!playlist;
  const [form, setForm] = useState({ playlistName: '', description: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (playlist) {
      setForm({ playlistName: playlist.title || '', description: playlist.description || '' });
    } else {
      setForm({ playlistName: '', description: '' });
    }
  }, [playlist, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.playlistName.trim()) {
      showToast('Playlist name is required', 'error');
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await updatePlaylist(playlist._id, form);
        showToast('Playlist updated!', 'success');
      } else {
        await createPlaylist(form);
        showToast('Playlist created!', 'success');
      }
      onSaved?.();
      onClose();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save playlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Playlist' : 'New Playlist'} size="sm">
      <form className="playlist-modal-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>Name *</label>
          <input
            type="text"
            placeholder="Playlist name"
            value={form.playlistName}
            onChange={(e) => setForm({ ...form, playlistName: e.target.value })}
            required
          />
        </div>
        <div className="auth-field">
          <label>Description</label>
          <input
            type="text"
            placeholder="Optional description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="playlist-modal-actions">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm" icon={isEdit ? Save : Plus} loading={loading}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PlaylistModal;
