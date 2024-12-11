import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useModelContext } from "../context/ModelContext";
import { getModelMetadata, loadModel } from "../utils/threeHelpers";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Viewer: React.FC = () => {
  const { modelUrl, fileExtension, showWireframe, showAxesHelper, setModelMetadata } = useModelContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const axesHelperRef = useRef<THREE.AxesHelper | null>(null);



  useEffect(() => {
    if (!containerRef.current) return; //prevents code executions if container is empty
    // create scene with properties
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    scene.add(new THREE.AmbientLight(0xf0f0f0, 3));
    //grid for scene
    const grid = new THREE.GridHelper(1000, 20);
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    scene.add(grid);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 250, 1000);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // OrbitControls to handle rotation and zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render );
    controls.maxDistance = 1500;

    const animate = () => {
      renderer.render(scene, camera);
    };

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    animate();

    function render() {
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      render();
    }

    window.addEventListener("resize", onWindowResize);


    return () => {
      window.removeEventListener("resize", onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (modelUrl && sceneRef.current) {
      // remove prev model
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }
      console.log("loading model...")
      loadModel(modelUrl, sceneRef.current, fileExtension || "")
      .then((model:any) => {
        modelRef.current = model;
        sceneRef.current?.add(model);
        console.log()
        setModelMetadata(getModelMetadata(model));
        if (modelRef.current) {
          console.log("dddd",modelRef)
          modelRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              console.log(child)
              child.material.wireframe = showWireframe;
            }
          });
        }
      });
    }
  }, [modelUrl, showWireframe]);
  
  useEffect(() => {
    if (sceneRef.current) {
      if (showAxesHelper) {
        if (!axesHelperRef.current) {
          const axesHelper = new THREE.AxesHelper(500);
          sceneRef.current.add(axesHelper);
          axesHelperRef.current = axesHelper;
        }
      } else if (axesHelperRef.current) {
        sceneRef.current.remove(axesHelperRef.current);
        axesHelperRef.current = null;
      }
    }
  }, [showAxesHelper]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Viewer;
