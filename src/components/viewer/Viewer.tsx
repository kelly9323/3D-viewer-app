import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { threeSetup } from "../viewer/threeSetup";
import { useModelContext } from "../../context/ModelContext";
import {
  adjustModelPosition,
  getModelMetadata,
  loadModel,
} from "../../utils/threeHelpers";

const Viewer: React.FC = () => {
  const { modelUrl, fileExtension, setModelMetadata, setModel, setLoading } =
    useModelContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  // scene setup
  const { scene } = threeSetup(containerRef);

  // model loader
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!modelUrl || !scene) return;
    setLoading(true);

    if (modelRef.current) {
      scene.remove(modelRef.current);
      modelRef.current = null;
    }

    loadModel(modelUrl, scene, fileExtension || "").then((model: any) => {
      modelRef.current = model;
      setModel(model);
      scene.add(model);      
      setModelMetadata(getModelMetadata(model));
      adjustModelPosition(model);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [modelUrl, fileExtension, scene]);

  return (
    <div ref={containerRef} style={{ width: "100%", overflow: "hidden" }}></div>
  );
};


export default Viewer;
