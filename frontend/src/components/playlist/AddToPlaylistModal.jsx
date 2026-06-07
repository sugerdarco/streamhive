import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { getAllPlaylists, addVideoToPlaylist } from '../../services/playlistService';
import { useToast } from '../../context/ToastContext';
import { ListVideo, Plus, Check } from 'lucide-react';
import './AddToPlaylistModal.css';

const AddToPlaylistModal = ({ isOpen, onClose, videoId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetch = async () => {
        setLoading(true);
        try {
          const { data } = await getAllPlaylists();
          setPlaylists(data.data || []);
        } catch {
          setPlaylists([]);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [isOpen]);

  const handleAdd = async (playlistId) => {
    setAddingId(playlistId);
    try {
      await addVideoToPlaylist(playlistId, videoId);
      showToast('Video added to playlist!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add', 'error');
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save to Playlist" size="sm">
      <div className="add-to-playlist-body">
        {loading ? (
          <p className="add-to-playlist-loading">Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p className="add-to-playlist-empty">No playlists yet. Create one from the Playlists page.</p>
        ) : (
          <div className="add-to-playlist-list">
            {playlists.map((pl) => {
              const alreadyAdded = pl.videos?.some((v) => (typeof v === 'string' ? v : v._id) === videoId);
              return (
                <div key={pl._id} className="add-to-playlist-item">
                  <div className="add-to-playlist-info">
                    <ListVideo size={18} />
                    <span className="truncate">{pl.title}</span>
                    <span className="add-to-playlist-count">{pl.videos?.length || 0} videos</span>
                  </div>
                  <Button
                    variant={alreadyAdded ? 'ghost' : 'secondary'}
                    size="sm"
                    icon={alreadyAdded ? Check : Plus}
                    disabled={alreadyAdded || addingId === pl._id}
                    loading={addingId === pl._id}
                    onClick={() => handleAdd(pl._id)}
                  >
                    {alreadyAdded ? 'Added' : 'Add'}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddToPlaylistModal;
