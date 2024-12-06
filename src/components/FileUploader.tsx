import React from 'react';
import { useModelContext } from '../context/ModelContext';

const FileUploader: React.FC = () => {
  const { setModelUrl, setFileExtension } = useModelContext();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); //local reference to file
      const extension = file.path.split(".").pop()?.toLowerCase() || null;
      setModelUrl(url); //update url in ModelContext
      setFileExtension(extension);
    }
  };

  return (
    <div>
      <input type="file" accept=".obj,.gltf,.glb,.stl" onChange={handleFileUpload} />
      <p>Upload a 3D mesh file</p>
    </div>
  );
};

export default FileUploader;
