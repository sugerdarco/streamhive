import { useState, useEffect } from 'react';
import { getSubscribedChannels } from '../services/subscriptionService';
import { PageLoader } from '../components/common/Loader';
import Avatar from '../components/common/Avatar';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import './Subscriptions.css';

const Subscriptions = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getSubscribedChannels();
        setChannels(data.data || []);
      } catch {
        setChannels([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="page-container">
      <div className="subs-header">
        <Users size={28} className="subs-icon" />
        <h1 className="page-title">Subscriptions</h1>
      </div>

      {!channels || channels.length === 0 ? (
        <p className="dashboard-empty">You haven't subscribed to any channels yet.</p>
      ) : (
        <div className="subs-grid animate-fade-in-up">
          {channels.map((sub) => (
            <Link to={`/channel/${sub.channel?.username || sub.channel}`} key={sub._id} className="sub-card glass">
              <Avatar src={sub.channel?.avatar} name={sub.channel?.fullName || 'Channel'} size={48} />
              <div>
                <p className="sub-name">{sub.channel?.fullName || 'Channel'}</p>
                <p className="sub-username">@{sub.channel?.username || sub.channel}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
