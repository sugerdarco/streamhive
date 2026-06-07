import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelProfile } from '../services/userService';
import { toggleSubscription } from '../services/subscriptionService';
import { getAllVideos } from '../services/videoService';
import ChannelHeader from '../components/channel/ChannelHeader';
import ChannelTabs from '../components/channel/ChannelTabs';
import VideoGrid from '../components/video/VideoGrid';
import { PageLoader } from '../components/common/Loader';
import { useToast } from '../context/ToastContext';
import './Channel.css';

const channelTabs = [
  { key: 'videos', label: 'Videos' },
  { key: 'about', label: 'About' },
];

const Channel = () => {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const { showToast } = useToast();

  const fetchChannel = async () => {
    setLoading(true);
    try {
      const { data } = await getChannelProfile(username);
      setChannel(data.data);
    } catch {
      showToast('Channel not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelVideos = async () => {
    setLoadingVideos(true);
    try {
      const { data } = await getAllVideos({ query: '', page: 1, limit: 50, userId: channel?._id });
      setVideos(data.data || []);
    } catch {
      setVideos([]);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (username) fetchChannel();
  }, [username]);

  useEffect(() => {
    if (channel?._id && activeTab === 'videos') fetchChannelVideos();
  }, [channel, activeTab]);

  const handleSubscribe = async () => {
    try {
      await toggleSubscription(channel._id);
      showToast('Subscription toggled!', 'success');
      const { data } = await getChannelProfile(username);
      setChannel(data.data);
    } catch {
      showToast('Failed', 'error');
    }
  };

  if (loading) return <PageLoader />;
  if (!channel) return <div className="page-container"><p>Channel not found.</p></div>;

  return (
    <div className="channel-page animate-fade-in">
      <ChannelHeader channel={channel} onSubscribe={handleSubscribe} />
      <ChannelTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={channelTabs} />

      <div className="channel-content page-container">
        {activeTab === 'videos' && (
          loadingVideos ? <PageLoader /> : <VideoGrid videos={videos} />
        )}
        {activeTab === 'about' && (
          <div className="channel-about">
            <p><strong>Email:</strong> {channel.email}</p>
            <p><strong>Username:</strong> @{channel.username}</p>
            <p><strong>Full Name:</strong> {channel.fullName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
