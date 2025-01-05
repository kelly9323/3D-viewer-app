import React from "react";
import "../styles/LoadingOverlay.css";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
        <h2>Loading...</h2>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
