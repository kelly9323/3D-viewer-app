import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useModelContext } from "../../context/ModelContext";

export const threeSetup = (
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null); 
  const hemisphereLightRef = useRef<THREE.HemisphereLight | null>(null); 

  const {setScene} = useModelContext();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x949494);

    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(15, 10, -15);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;

    // Add lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    directionalLightRef.current = directionalLight;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0x8d7c7c, 0x494966, 1.5);
    hemisphereLightRef.current = hemisphereLight;

    scene.add(hemisphereLight);

    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.7);
    light2.position.set(-10, 10, -10);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
    light3.position.set(0, 10, 10);
    scene.add(light3);

    const render = () => {
      if (directionalLightRef.current && camera) {
        directionalLightRef.current.position.copy(camera.position);
        directionalLightRef.current.position.add(new THREE.Vector3(-5, 5, 5));
      }
      if (hemisphereLightRef.current && camera) {
        hemisphereLightRef.current.position.copy(camera.position);
      }
      renderer.render(scene, camera);
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    controls.maxDistance = 1500;

    containerRef.current.appendChild(renderer.domElement);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };
    window.addEventListener("resize", onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    sceneRef.current = scene;
    setScene(scene);
    return () => {
      window.removeEventListener("resize", onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [containerRef, setScene]);

  return {
    scene: sceneRef.current,
  };
};
