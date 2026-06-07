import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoById } from '../services/videoService';
import { toggleVideoLike } from '../services/likeService';
import { toggleSubscription } from '../services/subscriptionService';
import VideoPlayer from '../components/video/VideoPlayer';
import CommentSection from '../components/comment/CommentSection';
import AddToPlaylistModal from '../components/playlist/AddToPlaylistModal';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { PageLoader } from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ThumbsUp, UserPlus, Share2, Eye, ListPlus } from 'lucide-react';
import { formatViews, formatDate } from '../utils/formatters';
import './Watch.css';

const Watch = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const { data } = await getVideoById(videoId);
        setVideo(data.data);
      } catch {
        showToast('Failed to load video', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (videoId) fetchVideo();
  }, [videoId]);

  const handleLike = async () => {
    try {
      await toggleVideoLike(videoId);
      showToast('Like toggled!', 'success');
    } catch {
      showToast('Failed to toggle like', 'error');
    }
  };

  const handleSubscribe = async () => {
    try {
      if (video?.owner?._id) {
        await toggleSubscription(video.owner._id);
        showToast('Subscription toggled!', 'success');
      }
    } catch {
      showToast('Failed to toggle subscription', 'error');
    }
  };

  if (loading) return <PageLoader />;
  if (!video) return <div className="page-container"><p>Video not found.</p></div>;

  return (
    <div className="watch-page">
      <div className="watch-main">
        <VideoPlayer src={video.playbackUrl || video.videoFile} thumbnail={video.thumbnail} title={video.title} />

        <div className="watch-info animate-fade-in-up">
          <h1 className="watch-title">{video.title}</h1>

          <div className="watch-meta-row">
            <div className="watch-channel">
              <Link to={`/channel/${video.owner?.username || ''}`}>
                <Avatar src={video.owner?.avatar} name={video.owner?.fullName} size={40} />
              </Link>
              <div>
                <Link to={`/channel/${video.owner?.username || ''}`} className="watch-channel-name">
                  {video.owner?.fullName || video.owner?.username}
                </Link>
              </div>
              {user?._id !== video.owner?._id && (
                <Button variant="primary" size="sm" icon={UserPlus} onClick={handleSubscribe}>
                  Subscribe
                </Button>
              )}
            </div>
            <div className="watch-actions">
              <Button variant="secondary" size="sm" icon={ThumbsUp} onClick={handleLike}>Like</Button>
              <Button variant="ghost" size="sm" icon={ListPlus} onClick={() => setShowPlaylistModal(true)}>Save</Button>
              <Button variant="ghost" size="sm" icon={Share2} onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!', 'info'); }}>Share</Button>
            </div>
          </div>

          <div className="watch-description">
            <div className="watch-stats">
              <span><Eye size={14} /> {formatViews(video.views)}</span>
              <span>{formatDate(video.createdAt)}</span>
            </div>
            <p>{video.description}</p>
          </div>
        </div>

        <CommentSection videoId={videoId} />
      </div>

      <AddToPlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        videoId={videoId}
      />
    </div>
  );
};

export default Watch;
