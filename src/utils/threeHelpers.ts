import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadModel = (url: string, scene: THREE.Scene, extension: string) => {
  const gltfLoader = new GLTFLoader();
  const stlLoader = new STLLoader();
  console.log("ext", extension)
  switch (extension) {
    case "stl":
      stlLoader.load(
        url,
        (geometry) => {
          const material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: 0x494949, shininess: 200 } );
					const mesh = new THREE.Mesh( geometry, material );

          // mesh.position.set( 0, - 0.25, 0.6 );
					// mesh.rotation.set( 0, - Math.PI / 2, 0 );
					mesh.scale.set( 0.5, 0.5, 0.5 );

					// mesh.castShadow = true;
					// mesh.receiveShadow = true;

          scene.add(mesh);
        },
        undefined, // onProgress
        (error) => {
          console.error("Error loading model:", error);
        }
      );
      break;
    case "glb":
      console.log("model glb")
      gltfLoader.load(
        url,
        (gltf) => {
          scene.add(gltf.scene);
        },
        undefined, // onProgress
        (error) => {
          console.error("Error loading model:", error);
        }
      );
      break;
    default:
      break;
  }
};
