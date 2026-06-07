import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Menu, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import SearchBar from '../common/SearchBar';
import './Navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = useCallback((query) => {
    if (query.trim()) {
      navigate(`/?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    setShowMenu(false);
    navigate('/login');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={22} />
        </button>
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
              <rect width="32" height="32" rx="7" fill="url(#nav-grad)" />
              <polygon points="12,9 12,23 24,16" fill="white" />
              <defs><linearGradient id="nav-grad" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stopColor="#e94560"/><stop offset="100%" stopColor="#0f3460"/></linearGradient></defs>
            </svg>
          </div>
          <span className="navbar-logo-text">StreamHive</span>
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/upload" className="navbar-upload-btn" id="upload-btn">
              <Upload size={20} />
              <span className="navbar-upload-text">Upload</span>
            </Link>
            <div className="navbar-user" ref={menuRef}>
              <button className="navbar-avatar-btn" onClick={() => setShowMenu(!showMenu)} id="user-menu-btn">
                <Avatar src={user?.avatar} name={user?.fullName} size={34} />
              </button>
              {showMenu && (
                <div className="navbar-dropdown animate-fade-in">
                  <div className="navbar-dropdown-header">
                    <Avatar src={user?.avatar} name={user?.fullName} size={40} />
                    <div>
                      <p className="navbar-dropdown-name">{user?.fullName}</p>
                      <p className="navbar-dropdown-username">@{user?.username}</p>
                    </div>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <Link to={`/channel/${user?.username}`} className="navbar-dropdown-item" onClick={() => setShowMenu(false)}>
                    <User size={18} /> Your Channel
                  </Link>
                  <Link to="/dashboard" className="navbar-dropdown-item" onClick={() => setShowMenu(false)}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link to="/settings" className="navbar-dropdown-item" onClick={() => setShowMenu(false)}>
                    <Settings size={18} /> Settings
                  </Link>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item navbar-dropdown-logout" onClick={handleLogout}>
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
