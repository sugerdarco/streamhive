import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../services/playlistService';
import VideoGrid from '../components/video/VideoGrid';
import { PageLoader } from '../components/common/Loader';
import { useToast } from '../context/ToastContext';
import './PlaylistDetail.css';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getPlaylist(playlistId);
        setPlaylist(data.data?.[0] || null);
      } catch { showToast('Failed to load playlist', 'error'); }
      finally { setLoading(false); }
    };
    if (playlistId) fetch();
  }, [playlistId]);

  if (loading) return <PageLoader />;
  if (!playlist) return <div className="page-container"><p>Playlist not found.</p></div>;

  return (
    <div className="page-container">
      <h1 className="page-title">{playlist.title}</h1>
      {playlist.description && <p className="playlist-desc">{playlist.description}</p>}
      <VideoGrid videos={playlist.videos || []} />
    </div>
  );
};

export default PlaylistDetail;
