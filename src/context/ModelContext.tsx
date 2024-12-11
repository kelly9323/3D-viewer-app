import React, { createContext, useState, useContext } from "react";
import * as THREE from "three";

//centralize states management without passing props between compnents
interface ModelContextProps {
  modelUrl: string | null;
  fileExtension: string | null;
  showWireframe: boolean | undefined;
  showAxesHelper: boolean | undefined;
  modelMetadata: Record<string, any> | null;
  localPlane: THREE.Plane | null;
  globalPlane: THREE.Plane | null;

  setModelUrl: (url: string | null) => void;
  setFileExtension: (extension: string | null) => void;
  setShowWireframe: (value: boolean) => void;
  setShowAxesHelper: (value: boolean) => void;
  setModelMetadata: (value: Record<string, any>) => void;
  setLocalPlane: (plane: THREE.Plane) => void;
  setGlobalPlane: (plane: THREE.Plane) => void;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [showAxesHelper, setShowAxesHelper] = useState<boolean>(false);
  const [modelMetadata, setModelMetadata] = useState<Record<string, any> | null>(null);
  const [localPlane, setLocalPlane] = useState<THREE.Plane | null>(null);
  const [globalPlane, setGlobalPlane] = useState<THREE.Plane | null>(null);
  //makes state available for children wrapped inside
  return (
    <ModelContext.Provider
      value={{
        modelUrl,
        setModelUrl,
        fileExtension,
        setFileExtension,
        showWireframe,
        setShowWireframe,
        showAxesHelper,
        setShowAxesHelper,
        modelMetadata,
        setModelMetadata,
        localPlane,
        globalPlane,
        setLocalPlane,
        setGlobalPlane,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) throw new Error("useModelContext is used inside ModelProvider");
  return context;
};
