import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useModelContext } from "../context/ModelContext";
import { loadModel } from "../utils/threeHelpers";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const Viewer: React.FC = () => {
  const { modelUrl, fileExtension } = useModelContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100000
    );

    camera.position.z = 8;
    const light = new THREE.AmbientLight(0x404040, 20); // soft white light
    scene.add(camera);
   
    scene.add(light);
    // const lt = new THREE.PointLight(0xffffff, 25, 0, 0);
    // camera.add(lt);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    animate();
    console.log("dd", modelUrl);
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

			function render() {
				renderer.render( scene, camera );
			}

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (modelUrl && sceneRef.current) {
      console.log("im here");
      console.log(modelUrl);
      loadModel(modelUrl, sceneRef.current, fileExtension || "" );
    }
  }, [modelUrl]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Viewer;
