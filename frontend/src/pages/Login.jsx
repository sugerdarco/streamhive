import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import { LogIn } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      showToast('Welcome back!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-scale-in">
        <div className="auth-logo">
          <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
            <rect width="32" height="32" rx="7" fill="url(#auth-grad)" />
            <polygon points="12,9 12,23 24,16" fill="white" />
            <defs><linearGradient id="auth-grad" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stopColor="#e94560"/><stop offset="100%" stopColor="#0f3460"/></linearGradient></defs>
          </svg>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your StreamHive account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email or Username</label>
            <input
              id="login-email"
              type="text"
              placeholder="Enter your email or username"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <Button type="submit" variant="gradient" size="lg" loading={loading} icon={LogIn} className="auth-submit">
            Sign In
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
