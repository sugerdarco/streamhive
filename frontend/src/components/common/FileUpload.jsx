import { useState, useRef, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ accept, label, onChange, preview, id }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef();

  const handleFile = useCallback((file) => {
    if (!file) return;
    onChange(file);
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [onChange]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const clear = () => {
    setPreviewUrl(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="file-upload-wrapper">
      {label && <label className="file-upload-label">{label}</label>}
      <div
        className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${previewUrl ? 'has-preview' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="file-preview">
            {accept?.includes('video') ? (
              <video src={previewUrl} className="file-preview-media" />
            ) : (
              <img src={previewUrl} alt="Preview" className="file-preview-media" />
            )}
            <button className="file-preview-remove" onClick={(e) => { e.stopPropagation(); clear(); }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="file-upload-placeholder">
            <Upload size={28} />
            <span>Drag & drop or click to upload</span>
            {accept && <span className="file-upload-accept">{accept}</span>}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="file-upload-input"
          id={id}
        />
      </div>
    </div>
  );
};

export default FileUpload;
