import React, { createContext, useState, useContext } from "react";
import * as THREE from "three";

//centralize states management without passing props between compnents
interface ModelContextProps {
  modelUrl: string | null;
  fileExtension: string | null;
  showWireframe: boolean | undefined;
  showAxesHelper: boolean | undefined;
  modelMetadata: Record<string, any> | null;
  showGrid: boolean | undefined;
  showClippingPlane: boolean | undefined;
  model: THREE.Object3D | null;
  scene: THREE.Scene | null;
  loading: boolean;
  

  setModelUrl: (url: string | null) => void;
  setFileExtension: (extension: string | null) => void;
  setShowWireframe: (value: boolean) => void;
  setShowAxesHelper: (value: boolean) => void;
  setModelMetadata: (value: Record<string, any>) => void;
  setShowGrid: (value: boolean) => void;
  setShowClippingPlane: (value: boolean) => void;
  setModel: (model: THREE.Object3D | null) => void;
  setScene: (scene: THREE.Scene | null) => void;
  setLoading: (state: boolean) => void;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [showAxesHelper, setShowAxesHelper] = useState<boolean>(false);
  const [modelMetadata, setModelMetadata] = useState<Record<
    string,
    any
  > | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showClippingPlane, setShowClippingPlane] = useState<boolean>(false);
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        showGrid,
        setShowGrid,
        showClippingPlane,
        setShowClippingPlane,
        model,
        setModel,
        scene,
        setScene,
        loading,
        setLoading,
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
