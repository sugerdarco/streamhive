import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { formatCount } from '../../utils/formatters';
import { UserPlus, Bell } from 'lucide-react';
import './ChannelHeader.css';

const ChannelHeader = ({ channel, onSubscribe }) => {
  const { user } = useAuth();
  const isOwn = user?._id === channel?._id;

  return (
    <div className="channel-header-wrapper">
      <div className="channel-cover" style={{ backgroundImage: channel?.coverImage ? `url(${channel.coverImage})` : undefined }}>
        <div className="channel-cover-overlay" />
      </div>

      <div className="channel-header-info">
        <Avatar src={channel?.avatar} name={channel?.fullName} size={80} className="channel-main-avatar" />
        <div className="channel-header-meta">
          <h1 className="channel-header-name">{channel?.fullName}</h1>
          <p className="channel-header-username">@{channel?.username}</p>
          <p className="channel-header-stats">
            {formatCount(channel?.subscribersCount)} subscribers • {formatCount(channel?.subscribedCount)} subscriptions
          </p>
        </div>
        {!isOwn && (
          <Button variant="primary" size="md" icon={channel?.isSubscribed ? Bell : UserPlus} onClick={onSubscribe}>
            {channel?.isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChannelHeader;
