import React, { useEffect, useState } from "react";
import { useModelContext } from "../../context/ModelContext";
import "../../styles/Toolbar.css";
import chevronRight from "../../assets/icons/chevron-right.svg";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import ClippingPlane from "../viewer/features/ClippingPlane";
import AxesHelper from "../viewer/features/AxesHelper";
import Grid from "../viewer/features/Grid";
import Wireframe from "../viewer/features/Wireframe";

const ToolBar: React.FC = () => {
  const {
    showGrid,
    showWireframe,
    showAxesHelper,
    showClippingPlane,
    setShowGrid,
    setShowWireframe,
    setShowAxesHelper,
    setShowClippingPlane,
    modelMetadata,
    model,
    scene,
    modelUrl,
  } = useModelContext();
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  console.log("metadaa", modelUrl);

  useEffect(() => {
    if (modelUrl) {
      setIsToolbarOpen(true);
    }
  }, [modelUrl]);

  const toggleToolbar = () => {
    setIsToolbarOpen(!isToolbarOpen);
  };

  const handleClippingPlaneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowClippingPlane(event.target.checked);
  };

  return (
    <>
      <button
        className={`toolbar-toggle-btn ${isToolbarOpen ? "toggle-active" : ""}`}
        onClick={toggleToolbar}
      >
        {isToolbarOpen ? (
          <img className="chevron-icon" src={chevronLeft} alt="chevron-left" />
        ) : (
          <img
            className="chevron-icon"
            src={chevronRight}
            alt="chevron-right"
          />
        )}
      </button>
      <div
        className={`toolbar-container ${isToolbarOpen ? "toolbar-open" : ""}`}
      >
        <Grid
          scene={scene}
          showGrid={showGrid || false}
          setShowGrid={setShowGrid}
        />

        <Wireframe
          model={model}
          showWireframe={showWireframe || false}
          setShowWireframe={setShowWireframe}
        />

        <AxesHelper
          scene={scene}
          showAxesHelper={showAxesHelper || false}
          setShowAxesHelper={setShowAxesHelper}
        />

        {/* CLIPPING PANE */}

        <div className="toolbar-checkbox-wrapper">
          <div className="toolbar-cb-container">
            <label className="toolbar-switch">
              <input
                type="checkbox"
                checked={showClippingPlane}
                onChange={handleClippingPlaneChange}
                id="tb-cp"
              />
              <span className="toolbar-slider-btn"></span>
            </label>
            <label htmlFor="tb-cp" className="tb-switch-label">
              Clipping Plane
            </label>
          </div>
        </div>

        <ClippingPlane
          model={model}
          visible={showClippingPlane || false}
          scene={scene}
        />

        <div>
          <h3>Model Metadata</h3>
          {modelMetadata ? (
            <table className="model-metadata-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Vertices:</strong>
                  </td>
                  <td>{modelMetadata.verticesCount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Faces:</strong>
                  </td>
                  <td>{modelMetadata.facesCount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Meshes:</strong>
                  </td>
                  <td>{modelMetadata.meshesCount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Materials:</strong>
                  </td>
                  <td>{modelMetadata.materialsCount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Bounding Box:</strong>
                  </td>
                  <td>
                    {modelMetadata.boundingBox.width > 0
                      ? `${modelMetadata.boundingBox.width.toFixed(
                          2
                        )} x ${modelMetadata.boundingBox.height.toFixed(
                          2
                        )} x ${modelMetadata.boundingBox.depth.toFixed(2)}`
                      : "Loading..."}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Loading model metadata...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
