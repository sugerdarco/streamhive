import { Link } from 'react-router-dom';
import { formatViews, formatDuration, formatDate } from '../../utils/formatters';
import Avatar from '../common/Avatar';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video._id}`} className="video-card" id={`video-${video._id}`}>
      <div className="video-card-thumb">
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        <span className="video-card-duration">{formatDuration(video.duration)}</span>
      </div>
      <div className="video-card-info">
        {video.owner && (
          <Avatar src={video.owner?.avatar} name={video.owner?.fullName} size={36} />
        )}
        <div className="video-card-meta">
          <h3 className="video-card-title truncate-2">{video.title}</h3>
          <p className="video-card-channel truncate">{video.owner?.fullName || video.owner?.username || ''}</p>
          <p className="video-card-stats">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
