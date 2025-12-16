import React from 'react';
import '../styles/components/_loading.scss';

export const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <span className="loading loading-infinity loading-xs"></span>
      <span className="loading loading-infinity loading-sm"></span>
      <span className="loading loading-infinity loading-md"></span>
      <span className="loading loading-infinity loading-lg"></span>
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );
};
