import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { updateAccountDetails, updateAvatar, updateCoverImage, changePassword } from '../services/userService';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import FileUpload from '../components/common/FileUpload';
import { Save, Lock, Image, User } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState({ fullName: user?.fullName || '', email: user?.email || '' });
  const [passwords, setPasswords] = useState({ password: '', newPassword: '', reNewPassword: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [savingCover, setSavingCover] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updateAccountDetails(profile);
      await refreshUser();
      showToast('Profile updated!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update', 'error');
    } finally { setSavingProfile(false); }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.reNewPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword(passwords);
      showToast('Password changed!', 'success');
      setPasswords({ password: '', newPassword: '', reNewPassword: '' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to change password', 'error');
    } finally { setSavingPassword(false); }
  };

  const handleAvatarChange = async (file) => {
    if (!file) return;
    setSavingAvatar(true);
    try {
      const fd = new FormData();
      fd.append('avatar', file);
      await updateAvatar(fd);
      await refreshUser();
      showToast('Avatar updated!', 'success');
    } catch { showToast('Failed to update avatar', 'error'); }
    finally { setSavingAvatar(false); }
  };

  const handleCoverChange = async (file) => {
    if (!file) return;
    setSavingCover(true);
    try {
      const fd = new FormData();
      fd.append('coverImage', file);
      await updateCoverImage(fd);
      await refreshUser();
      showToast('Cover image updated!', 'success');
    } catch { showToast('Failed to update cover', 'error'); }
    finally { setSavingCover(false); }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Settings</h1>

      <div className="settings-grid">
        {/* Profile Section */}
        <section className="settings-section glass animate-fade-in-up">
          <div className="settings-section-header">
            <User size={20} />
            <h2>Profile Details</h2>
          </div>
          <form onSubmit={handleProfileSubmit} className="settings-form">
            <div className="settings-user-preview">
              <Avatar src={user?.avatar} name={user?.fullName} size={56} />
              <div>
                <p className="settings-username">@{user?.username}</p>
                <p className="settings-email-preview">{user?.email}</p>
              </div>
            </div>
            <div className="auth-field">
              <label htmlFor="settings-fullname">Full Name</label>
              <input id="settings-fullname" type="text" value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
            </div>
            <div className="auth-field">
              <label htmlFor="settings-email">Email</label>
              <input id="settings-email" type="email" value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <Button type="submit" variant="primary" size="sm" icon={Save} loading={savingProfile}>
              Save Changes
            </Button>
          </form>
        </section>

        {/* Password Section */}
        <section className="settings-section glass animate-fade-in-up">
          <div className="settings-section-header">
            <Lock size={20} />
            <h2>Change Password</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="settings-form">
            <div className="auth-field">
              <label htmlFor="settings-oldpw">Current Password</label>
              <input id="settings-oldpw" type="password" value={passwords.password}
                onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} required />
            </div>
            <div className="auth-field">
              <label htmlFor="settings-newpw">New Password</label>
              <input id="settings-newpw" type="password" value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} required />
            </div>
            <div className="auth-field">
              <label htmlFor="settings-renewpw">Confirm New Password</label>
              <input id="settings-renewpw" type="password" value={passwords.reNewPassword}
                onChange={(e) => setPasswords({ ...passwords, reNewPassword: e.target.value })} required />
            </div>
            <Button type="submit" variant="danger" size="sm" icon={Lock} loading={savingPassword}>
              Change Password
            </Button>
          </form>
        </section>

        {/* Images Section */}
        <section className="settings-section settings-section-wide glass animate-fade-in-up">
          <div className="settings-section-header">
            <Image size={20} />
            <h2>Profile Images</h2>
          </div>
          <div className="settings-images">
            <div>
              <FileUpload accept="image/*" label="Update Avatar" onChange={handleAvatarChange} id="settings-avatar" />
              {savingAvatar && <p className="settings-upload-status">Uploading...</p>}
            </div>
            <div>
              <FileUpload accept="image/*" label="Update Cover Image" onChange={handleCoverChange} id="settings-cover" />
              {savingCover && <p className="settings-upload-status">Uploading...</p>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
