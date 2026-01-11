import PropTypes from 'prop-types';

/**
 * LoadingSpinner - Reusable loading spinner component
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'large' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full border-b-2 border-white ${sizeClasses[size]} mb-4`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="text-white text-center">{message}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default LoadingSpinner;

