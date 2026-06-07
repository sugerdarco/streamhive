import './Loader.css';

export const Spinner = ({ size = 32 }) => (
  <div className="spinner" style={{ width: size, height: size }} />
);

export const PageLoader = () => (
  <div className="page-loader">
    <Spinner size={40} />
  </div>
);

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-thumb" />
    <div className="skeleton-info">
      <div className="skeleton skeleton-avatar" />
      <div className="skeleton-text">
        <div className="skeleton skeleton-line-lg" />
        <div className="skeleton skeleton-line-sm" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="video-grid">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
