import React, { useState } from "react";
import { useModelContext } from "../../context/ModelContext";
import "../../styles/UploadFile.css";
import plusImage from "../../assets/icons/add-plus-img.png";
import duckModel from "../../assets/models/duck.png";
import gunModel from "../../assets/models/gun.png";

const sampleModels = {
  model1: "models/Duck.glb",
  model2: "models/pistol.glb",
};

const MainImport: React.FC = () => {
  const { setModelUrl, setFileExtension } = useModelContext();
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File | string) => {
    // predefined model or import file
    if (typeof file === "string") {
      const extension = file.split(".").pop()?.toLowerCase() || null;
      setModelUrl(file);
      setFileExtension(extension);
    } else {
      const url = URL.createObjectURL(file); 
      const extension = file.name.split(".").pop()?.toLowerCase() || null;
      setModelUrl(url);
      setFileExtension(extension);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
// drag and drop 
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDefaultModelSelect = (modelKey: keyof typeof sampleModels) => {
    const modelUrl = sampleModels[modelKey];
    processFile(modelUrl);
  };

  return (
    <div className="drop-container-wrapper">
      <label
        htmlFor="file"
        className={`drop-container ${isDragging ? "dragging" : ""}`}
        id="dropcontainer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <img className="plus-image" src={plusImage} alt="" />
        <span className="drop-title">
          Drag and drop a .GLB, .GLTF, .FBX, .OBJ, or .STL file to preview{" "}
          <br /> your 3D model instantly.
        </span>
        <input
          type="file"
          id="file"
          accept=".obj,.gltf,.glb,.stl,.fbx"
          onChange={handleInputChange}
          required
        />

        <li></li>
        <h1 className="samples-header">Sample models</h1>

        <div className="default-models-container">
          <div
            className="default-model-image"
            onClick={() => handleDefaultModelSelect("model1")}
          >
            <img
              src={duckModel} 
              alt="Model 1"
              className="default-model-img"
            />
          </div>
          <div
            className="default-model-image"
            onClick={() => handleDefaultModelSelect("model2")}
          >
            <img
              src={gunModel}
              alt="Model 2"
              className="default-model-img"
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default MainImport;
