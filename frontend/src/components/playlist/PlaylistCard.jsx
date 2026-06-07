import { Link } from 'react-router-dom';
import { ListVideo, Trash2 } from 'lucide-react';
import './PlaylistCard.css';

const PlaylistCard = ({ playlist, onDelete }) => {
  return (
    <div className="playlist-card glass">
      <Link to={`/playlist/${playlist._id}`} className="playlist-card-link">
        <div className="playlist-card-icon"><ListVideo size={28} /></div>
        <h3 className="playlist-card-title truncate">{playlist.title}</h3>
        {playlist.description && <p className="playlist-card-desc truncate">{playlist.description}</p>}
        <p className="playlist-card-count">{playlist.videos?.length || 0} videos</p>
      </Link>
      {onDelete && (
        <button className="playlist-card-delete icon-btn icon-btn-danger" onClick={() => onDelete(playlist._id)} title="Delete playlist">
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export default PlaylistCard;
