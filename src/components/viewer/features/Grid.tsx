import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface GridProps {
  scene: THREE.Scene | null;
  showGrid: boolean;
  setShowGrid: (value: boolean) => void;
}

const Grid: React.FC<GridProps> = ({ scene, showGrid, setShowGrid }) => {
  const gridRef = useRef<THREE.GridHelper | null>(null);

  useEffect(() => {
    if (!scene) return;
    
    if (showGrid) {
      if (!gridRef.current) {
        const mainGrid = new THREE.GridHelper(10, 20, "#888888", "#FFEA00");
        scene.add(mainGrid);
        gridRef.current = mainGrid;
      }
    } else if (gridRef.current) {
      scene.remove(gridRef.current);
      gridRef.current = null;
      setShowGrid(false);
    }
  }, [showGrid]);

  const handleGridChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrid(event.target.checked);
  };

  return (
    <div className="toolbar-checkbox-wrapper">
      <div className="toolbar-cb-container">
        <label className="toolbar-switch">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={handleGridChange}
            id="tb-grid"
          />
          <span className="toolbar-slider-btn"></span>
        </label>
        <label htmlFor="tb-grid" className="tb-switch-label">
          Grid
        </label>
      </div>
    </div>
  );
};

export default Grid;
