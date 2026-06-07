import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import FileUpload from '../components/common/FileUpload';
import { UserPlus } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', fullName: '', password: '' });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      showToast('Avatar is required', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('fullName', form.fullName);
      formData.append('password', form.password);
      formData.append('avatar', avatar);
      if (coverImage) formData.append('coverImage', coverImage);

      await register(formData);
      showToast('Account created! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide animate-scale-in">
        <div className="auth-logo">
          <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
            <rect width="32" height="32" rx="7" fill="url(#reg-grad)" />
            <polygon points="12,9 12,23 24,16" fill="white" />
            <defs><linearGradient id="reg-grad" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stopColor="#e94560"/><stop offset="100%" stopColor="#0f3460"/></linearGradient></defs>
          </svg>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join StreamHive and start sharing</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="reg-fullname">Full Name</label>
              <input id="reg-fullname" type="text" placeholder="John Doe" value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-username">Username</label>
              <input id="reg-username" type="text" placeholder="johndoe" value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" placeholder="john@example.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="auth-field">
            <label htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" placeholder="Create a strong password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="auth-row">
            <FileUpload accept="image/*" label="Avatar *" onChange={setAvatar} id="reg-avatar" />
            <FileUpload accept="image/*" label="Cover Image" onChange={setCoverImage} id="reg-cover" />
          </div>
          <Button type="submit" variant="gradient" size="lg" loading={loading} icon={UserPlus} className="auth-submit">
            Create Account
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
