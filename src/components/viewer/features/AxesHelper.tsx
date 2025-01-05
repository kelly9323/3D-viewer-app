import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AxesHelperProps {
  scene: THREE.Scene | null;
  showAxesHelper: boolean;
  setShowAxesHelper: (value: boolean) => void;
}

const AxesHelper: React.FC<AxesHelperProps> = ({
  scene,
  showAxesHelper,
  setShowAxesHelper,
}) => {
  const axesHelperRef = useRef<THREE.AxesHelper | null>(null);

  useEffect(() => {
    if (!scene) return;

    if (showAxesHelper) {
      if (!axesHelperRef.current) {
        const axesHelper = new THREE.AxesHelper(500);
        axesHelper.renderOrder = 1; // Render on top of model/grid
        scene.add(axesHelper);
        axesHelperRef.current = axesHelper;
      }
    } else if (axesHelperRef.current) {
      scene.remove(axesHelperRef.current);
      axesHelperRef.current = null;
    }
  }, [showAxesHelper]);

  const handleAxesHelperChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAxesHelper(event.target.checked);
  };

  return (
    <div className="toolbar-checkbox-wrapper">
      <div className="toolbar-cb-container">
        <label className="toolbar-switch">
          <input
            type="checkbox"
            checked={showAxesHelper}
            onChange={handleAxesHelperChange}
            id="tb-ax"
          />
          <span className="toolbar-slider-btn"></span>
        </label>
        <label htmlFor="tb-ax" className="tb-switch-label">
          Axes Helper
        </label>
      </div>
    </div>
  );
};

export default AxesHelper;
