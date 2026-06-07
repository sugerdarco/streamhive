import { useState, useEffect } from 'react';
import { getAllPlaylists, deletePlaylist } from '../services/playlistService';
import { PageLoader } from '../components/common/Loader';
import Button from '../components/common/Button';
import PlaylistCard from '../components/playlist/PlaylistCard';
import PlaylistModal from '../components/playlist/PlaylistModal';
import { useToast } from '../context/ToastContext';
import { Plus } from 'lucide-react';
import './Playlists.css';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const { showToast } = useToast();

  const fetchPlaylists = async () => {
    try {
      const { data } = await getAllPlaylists();
      setPlaylists(data.data || []);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this playlist?')) return;
    try {
      await deletePlaylist(id);
      showToast('Playlist deleted', 'success');
      fetchPlaylists();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="page-container">
      <div className="playlists-header">
        <h1 className="page-title">Your Playlists</h1>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => { setEditingPlaylist(null); setShowModal(true); }}>
          New Playlist
        </Button>
      </div>

      {playlists.length === 0 ? (
        <p className="dashboard-empty">No playlists yet. Create one!</p>
      ) : (
        <div className="playlist-grid animate-fade-in-up">
          {playlists.map((pl) => (
            <PlaylistCard key={pl._id} playlist={pl} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <PlaylistModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingPlaylist(null); }}
        playlist={editingPlaylist}
        onSaved={fetchPlaylists}
      />
    </div>
  );
};

export default Playlists;
