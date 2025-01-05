import React, { useEffect } from "react";
import * as THREE from "three";

interface WireframeProps {
  model: THREE.Object3D | null;
  showWireframe: boolean;
  setShowWireframe: (value: boolean) => void;
}

const Wireframe: React.FC<WireframeProps> = ({
  model,
  showWireframe,
  setShowWireframe,
}) => {
  useEffect(() => {
    if (!model) return;

    model.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.material.wireframe = showWireframe;
      }
    });
  }, [showWireframe]);

  const handleWireframeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowWireframe(event.target.checked);
  };

  return (
    <div className="toolbar-checkbox-wrapper">
      <div className="toolbar-cb-container">
        <label className="toolbar-switch">
          <input
            type="checkbox"
            checked={showWireframe}
            onChange={handleWireframeChange}
            id="tb-wf"
          />
          <span className="toolbar-slider-btn"></span>
        </label>

        <label htmlFor="tb-wf" className="tb-switch-label">
          Wireframe
        </label>
      </div>
    </div>
  );
};

export default Wireframe;
