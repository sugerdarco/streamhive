import { useState, useEffect } from 'react';
import { getChannelStats, getChannelVideos } from '../services/dashboardService';
import { PageLoader } from '../components/common/Loader';
import StatsCards from '../components/dashboard/StatsCards';
import VideoManager from '../components/dashboard/VideoManager';
import { Eye, Users, Video, ThumbsUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, videosRes] = await Promise.all([
        getChannelStats(),
        getChannelVideos(),
      ]);
      setStats(statsRes.data.data);
      setVideos(videosRes.data.data || []);
    } catch {
      // partial data may be available
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  const statCards = [
    { icon: Eye, label: 'Total Views', value: stats?.totalViews || 0, color: '#2196f3' },
    { icon: Users, label: 'Subscribers', value: stats?.totalSubscribers || 0, color: '#e94560' },
    { icon: Video, label: 'Videos', value: stats?.totalVideos || 0, color: '#00c853' },
    { icon: ThumbsUp, label: 'Video Likes', value: stats?.totalLikesOnVideos || 0, color: '#ffab00' },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      <StatsCards stats={statCards} />
      <h2 className="dashboard-section-title">Your Videos</h2>
      <VideoManager videos={videos} onRefresh={fetchData} />
    </div>
  );
};

export default Dashboard;
