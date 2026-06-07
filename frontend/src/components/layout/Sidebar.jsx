import { NavLink } from 'react-router-dom';
import { Home, Compass, ListVideo, History, ThumbsUp, MessageSquare, Users, Settings } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/subscriptions', icon: Users, label: 'Subscriptions' },
  { divider: true },
  { path: '/playlists', icon: ListVideo, label: 'Playlists' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/liked', icon: ThumbsUp, label: 'Liked' },
  { path: '/tweets', icon: MessageSquare, label: 'Community' },
  { divider: true },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} id="main-sidebar">
        <nav className="sidebar-nav">
          {navItems.map((item, i) =>
            item.divider ? (
              <div key={i} className="sidebar-divider" />
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
                onClick={onClose}
              >
                <item.icon size={20} />
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            )
          )}
        </nav>
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">© 2026 StreamHive</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
