import './ChannelTabs.css';

const ChannelTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="channel-tabs-bar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`channel-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ChannelTabs;
