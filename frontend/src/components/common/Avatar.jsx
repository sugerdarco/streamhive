import { getInitials } from '../../utils/formatters';
import './Avatar.css';

const Avatar = ({ src, name, size = 36, className = '' }) => {
  if (src) {
    return (
      <img
        className={`avatar ${className}`}
        src={src}
        alt={name || 'User avatar'}
        style={{ width: size, height: size }}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`avatar avatar-fallback ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
