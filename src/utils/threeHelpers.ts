import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export const loadModel = (
  url: string,
  scene: THREE.Scene,
  extension: string
): Promise<THREE.Object3D | undefined> => {
  return new Promise((resolve, _reject) => {
    const gltfLoader = new GLTFLoader();
    const stlLoader = new STLLoader();
    const fbxLoader = new FBXLoader();
    const objLoader = new OBJLoader();
    console.log("ext", extension);
    switch (extension) {
      case "stl":
        stlLoader.load(
          url,
          (geometry: THREE.BufferGeometry) => {
            const material = new THREE.MeshStandardMaterial({
              color: 0xff9c7c,
              metalness: 0.5,
              roughness: 0.7,
            });
            geometry.computeVertexNormals();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = false;
            mesh.receiveShadow = false;
            scene.add(mesh);
            resolve(mesh);
          },
          undefined, // onProgress
          (error) => {
            console.error("Error loading model:", error);
          }
        );
        break;
      case "glb":
      case "gltf":
        console.log("model glb");
        gltfLoader.load(
          url,
          (gltf) => {
            scene.add(gltf.scene);
            resolve(gltf.scene);
          },
          undefined, // onProgress
          (error) => {
            console.error("Error loading model:", error);
          }
        );
        break;
      case "fbx":
        fbxLoader.load(url, (fbx) => {
          scene.add(fbx);
          resolve(fbx);
        });
        break;
      case "obj":
        objLoader.load(url, (obj) => {
          scene.add(obj);
          resolve(obj);
        });
        break;
      default:
        break;
    }
  });
};

export const getModelMetadata = (
  model: THREE.Object3D
): Record<string, any> => {
  const metadata: Record<string, any> = {
    fileName: "",
    fileExtension: "",
    verticesCount: 0,
    facesCount: 0,
    meshesCount: 0,
    materialsCount: 0,
    boundingBox: { width: 0, height: 0, depth: 0 },
  };

  let verticesCount = 0;
  let facesCount = 0;
  const meshes: THREE.Mesh[] = [];
  const materialsSet: Set<THREE.Material> = new Set();

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      meshes.push(child);
      verticesCount += child.geometry.attributes.position.count;

      if (child.geometry.index) {
        facesCount += child.geometry.index.count / 3;
      } else {
        facesCount += verticesCount / 3;
      }

      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => materialsSet.add(mat));
      } else {
        materialsSet.add(child.material);
      }
    }
  });

  const boundingBox = new THREE.Box3().setFromObject(model);
  const size = boundingBox.getSize(new THREE.Vector3());

  return {
    ...metadata,
    verticesCount,
    facesCount,
    meshesCount: meshes.length,
    materialsCount: materialsSet.size,
    boundingBox: {
      width: size.x,
      height: size.y,
      depth: size.z,
    },
  };
};

export const adjustModelPosition = (model: THREE.Object3D) => {
  const boundingBox = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  boundingBox.getSize(size);
  boundingBox.getCenter(center);

  const scaleFactor = Math.min(10 / size.x, 10 / size.y, 10 / size.z);

  model.scale.set(scaleFactor * 0.5, scaleFactor * 0.5, scaleFactor * 0.5);

  const scaledBoundingBox = new THREE.Box3().setFromObject(model);
  const scaledSize = new THREE.Vector3();
  const scaledCenter = new THREE.Vector3();

  scaledBoundingBox.getSize(scaledSize);
  scaledBoundingBox.getCenter(scaledCenter);

  model.position.set(
    -scaledCenter.x,
    -scaledBoundingBox.min.y,
    -scaledCenter.z
  );
};

// export const clearModel = (
//   model: THREE.Object3D | null,
//   scene: THREE.Scene | null,
// ) => {
//   if (model && scene) {
//     scene.remove(model);
//     // clean memory to improve performance
//     if (model instanceof THREE.Mesh) {
//       model.geometry.dispose();
//       if (model.material) {
//         if (Array.isArray(model.material)) {
//           model.material.forEach((material) => material.dispose());
//         } else {
//           model.material.dispose();
//         }
//       }
//     }
//   }
// };
