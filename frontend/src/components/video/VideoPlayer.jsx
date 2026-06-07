import './VideoPlayer.css';

const VideoPlayer = ({ src, thumbnail, title }) => {
  return (
    <div className="video-player-wrapper">
      <video
        className="video-player"
        src={src}
        poster={thumbnail}
        controls
        autoPlay
        playsInline
        id="video-player"
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
