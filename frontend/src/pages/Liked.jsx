import { useState, useEffect } from 'react';
import { getLikedVideos, getLikedComments, getLikedTweets } from '../services/likeService';
import VideoGrid from '../components/video/VideoGrid';
import { PageLoader } from '../components/common/Loader';
import { useToast } from '../context/ToastContext';
import { formatDate } from '../utils/formatters';
import Avatar from '../components/common/Avatar';
import { ThumbsUp } from 'lucide-react';
import './Liked.css';

const tabs = [
  { key: 'videos', label: 'Videos' },
  { key: 'comments', label: 'Comments' },
  { key: 'tweets', label: 'Tweets' },
];

const Liked = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let res;
        if (activeTab === 'videos') res = await getLikedVideos();
        else if (activeTab === 'comments') res = await getLikedComments();
        else res = await getLikedTweets();
        setData(res.data.data || []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [activeTab]);

  return (
    <div className="page-container">
      <div className="liked-header">
        <ThumbsUp size={28} className="liked-icon" />
        <h1 className="page-title">Liked Content</h1>
      </div>

      <div className="liked-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`channel-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader />
      ) : activeTab === 'videos' ? (
        <VideoGrid videos={data.map((item) => item.video).filter(Boolean)} />
      ) : (
        <div className="liked-list">
          {data.length === 0 ? (
            <p className="dashboard-empty">No liked {activeTab} yet.</p>
          ) : (
            data.map((item) => {
              const content = item.comment || item.tweet;
              const owner = Array.isArray(content?.owner) ? content.owner[0] : content?.owner;
              return (
                <div key={item._id} className="liked-item glass">
                  <Avatar src={owner?.avatar} name={owner?.fullName} size={32} />
                  <div className="liked-item-body">
                    <span className="liked-item-author">{owner?.fullName || owner?.username || 'User'}</span>
                    <p className="liked-item-content">{content?.content || 'Content unavailable'}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Liked;
