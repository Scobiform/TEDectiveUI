import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => {
  return (
    <div className="loading-spinner" style={{ width: size, height: size }}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;