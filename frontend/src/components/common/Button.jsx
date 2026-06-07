import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, loading, disabled, className = '', ...props }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner" />}
      {Icon && !loading && <Icon size={size === 'sm' ? 16 : 18} />}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
