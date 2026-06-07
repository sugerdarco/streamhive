import { useState, useEffect } from 'react';
import { getWatchHistory } from '../services/userService';
import VideoGrid from '../components/video/VideoGrid';
import { PageLoader } from '../components/common/Loader';
import { History as HistoryIcon } from 'lucide-react';
import './History.css';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getWatchHistory();
        setVideos(data.data || []);
      } catch {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="page-container">
      <div className="history-header">
        <HistoryIcon size={28} className="history-icon" />
        <h1 className="page-title">Watch History</h1>
      </div>
      <VideoGrid videos={videos} />
    </div>
  );
};

export default History;
