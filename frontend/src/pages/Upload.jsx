import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishVideo } from '../services/videoService';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import FileUpload from '../components/common/FileUpload';
import { Upload as UploadIcon } from 'lucide-react';
import './Upload.css';

const Upload = () => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) { showToast('Video file is required', 'error'); return; }
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('description', form.description.trim());
      formData.append('videoFile', videoFile);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      await publishVideo(formData);
      showToast('Video uploaded successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.response?.data?.message || 'Upload failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Upload Video</h1>

      <form className="upload-form animate-fade-in-up" onSubmit={handleSubmit}>
        <div className="upload-files">
          <FileUpload accept="video/*" label="Video File *" onChange={setVideoFile} id="upload-video-file" />
          <FileUpload accept="image/*" label="Thumbnail" onChange={setThumbnail} id="upload-thumbnail" />
        </div>

        <div className="upload-fields">
          <div className="auth-field">
            <label htmlFor="upload-title">Title *</label>
            <input id="upload-title" type="text" placeholder="Enter video title" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="auth-field">
            <label htmlFor="upload-desc">Description</label>
            <textarea id="upload-desc" placeholder="Describe your video" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} className="upload-textarea" rows={5} />
          </div>
        </div>

        <Button type="submit" variant="gradient" size="lg" loading={loading} icon={UploadIcon} className="upload-submit">
          Publish Video
        </Button>
      </form>
    </div>
  );
};

export default Upload;
