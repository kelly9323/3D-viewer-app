import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

interface ClippingPlaneProps {
  model: THREE.Object3D | null;
  scene: THREE.Scene | null;
  visible: boolean;
}

const ClippingPlane: React.FC<ClippingPlaneProps> = ({
  model,
  scene,
  visible,
}) => {
  const guiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!model || !scene) return;

    if (!visible) {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.clippingPlanes = [];
          child.material.clipShadows = false;
          child.material.needsUpdate = false;
        }
      });
      return; 
    }

    const planes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 0), // X
      new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), // Y
      new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), // Z
    ];

    const boundingBox = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // set planes at the edges of model's bounding box
    planes[0].constant = boundingBox.max.x;
    planes[1].constant = boundingBox.max.y;
    planes[2].constant = boundingBox.max.z;

    const planeHelpers = planes.map((plane) => {
      const helper = new THREE.PlaneHelper(plane, 8, 0xffffff);
      scene.add(helper);
      return helper;
    });

    planeHelpers.forEach((helper) => (helper.visible = false));

    // GUI setup
    const gui = new GUI({ container: guiContainerRef.current || undefined });
    const planesFolder = gui.addFolder("Plane Clipping");

    planeHelpers.forEach((ph, index) => {
      planesFolder.add(ph, "visible").name(`${["X", "Y", "Z"][index]} helper`);
      planesFolder
        .add(planes[index], "constant", -size.length(), size.length(), 0.1)
        .name("Constant");
    });

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.clippingPlanes = planes;
        child.material.clipShadows = true;
        child.material.needsUpdate = true;
        child.material.transparent = false; 
        child.material.side = THREE.DoubleSide;
      }
    });

    return () => {
      gui.destroy();
      planeHelpers.forEach((helper) => {
        if (scene) {
          scene.remove(helper);
        }
      });
    };
  }, [model, scene, visible]);

  return <div ref={guiContainerRef} className="clipping-plane-gui-container" />;
};

export default ClippingPlane;
