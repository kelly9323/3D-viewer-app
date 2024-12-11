import React from "react";
import { useModelContext } from "../context/ModelContext";

const FileUploader: React.FC = () => {
  const { setModelUrl, setFileExtension, setShowWireframe, showWireframe, showAxesHelper, setShowAxesHelper, modelMetadata
   } = useModelContext();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); //local reference to file
      const extension = file.path.split(".").pop()?.toLowerCase() || null;
      setModelUrl(url);
      setFileExtension(extension);
    }
  };
  // move this somewhere 
  const handleWireframeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowWireframe(event.target.checked);
  };

  const handleAxesHelperChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAxesHelper(event.target.checked);
  };


  return (
    <div>
      <input
        type="file"
        accept=".obj,.gltf,.glb,.stl,.fbx"
        onChange={handleFileUpload}
      />
      <p>Upload a 3D mesh file .glb, .gltf, .fbx, .obj or .stl file</p>
      <label>
        <input
          type="checkbox"
          checked={showWireframe}
          onChange={handleWireframeChange}
        />
        Show Wireframe
      </label>
      <label>
        <input
          type="checkbox"
          checked={showAxesHelper}
          onChange={handleAxesHelperChange}
        />
        Show Axes Helper
      </label>

      <div style={{ width: "20%", padding: "1rem", overflowY: "auto" }}>
        <h3>Model Metadata</h3>
        {modelMetadata ? (
          <ul>
            <li><strong>Vertices:</strong> {modelMetadata.verticesCount}</li>
            <li><strong>Faces:</strong> {modelMetadata.facesCount}</li>
            <li><strong>Meshes:</strong> {modelMetadata.meshesCount}</li>
            <li><strong>Materials:</strong> {modelMetadata.materialsCount}</li>
            <li><strong>Bounding Box:</strong></li>
            <ul>
              <li>Width: {modelMetadata.boundingBox.width}</li>
              <li>Height: {modelMetadata.boundingBox.height}</li>
              <li>Depth: {modelMetadata.boundingBox.depth}</li>
            </ul>
          </ul>
        ) : (
          <p>Loading model metadata...</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
