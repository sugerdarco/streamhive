import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const Toast = ({ id, message, type = 'info', onClose }) => {
  const Icon = icons[type] || Info;

  return (
    <div className={`toast toast-${type}`} role="alert">
      <Icon size={18} />
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
