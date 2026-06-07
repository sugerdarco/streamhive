import VideoCard from './VideoCard';
import './VideoGrid.css';

const VideoGrid = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="video-grid-empty">
        <p>No videos found</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
