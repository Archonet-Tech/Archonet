// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const ThreeBuildingModel = ({ buildingInput }) => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create building
//     const geometry = new THREE.BoxGeometry(buildingInput.dimensions.width, buildingInput.dimensions.height, buildingInput.dimensions.depth);
//     const material = new THREE.MeshBasicMaterial({ color: buildingInput.materials.walls === 'concrete' ? 0xaaaaaa : 0x8b4513 });
//     const building = new THREE.Mesh(geometry, material);
//     scene.add(building);

//     // Position the camera
//     camera.position.z = 100;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, [buildingInput]);

//   return <div ref={mountRef} />;
// };

// export default ThreeBuildingModel;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBuildingModel = ({ buildingInput }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create building geometry
    const buildingGeometry = new THREE.BoxGeometry(
      buildingInput.dimensions.width,
      buildingInput.dimensions.height,
      buildingInput.dimensions.depth
    );

    // Materials based on user input
    const concreteMaterial = new THREE.MeshPhongMaterial({ color: buildingInput.materials.walls === 'concrete' ? 0xaaaaaa : 0xffd700 });
    const glassMaterial = new THREE.MeshPhongMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.5 });

    // Create building mesh
    const building = new THREE.Mesh(buildingGeometry, concreteMaterial);
    building.position.y = buildingInput.dimensions.height / 2; // Center the building vertically
    scene.add(building);

    // Create windows as additional boxes based on user input
    const windowGeometry = new THREE.BoxGeometry(
      buildingInput.windows.dimensions.width,
      buildingInput.windows.dimensions.height,
      0.05 // Thin window for walls
    );
    
    // Evenly distribute windows on the building's front face
    const windowRows = Math.floor(buildingInput.dimensions.height / (buildingInput.windows.dimensions.height * 1.5));
    const windowColumns = Math.floor(buildingInput.dimensions.width / (buildingInput.windows.dimensions.width * 1.5));
    let windowCount = 0;

    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowColumns; col++) {
        if (windowCount >= buildingInput.windows.quantity) break;

        const windowMesh = new THREE.Mesh(windowGeometry, glassMaterial);
        windowMesh.position.set(
          -buildingInput.dimensions.width / 2 + col * (buildingInput.windows.dimensions.width * 1.5) + 1, // Spacing between windows
          row * (buildingInput.windows.dimensions.height * 1.5) + buildingInput.windows.dimensions.height,
          buildingInput.dimensions.depth / 2 + 0.1 // Slight offset to place the window on the surface
        );
        scene.add(windowMesh);
        windowCount++;
      }
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Camera positioning
    camera.position.set(50, 50, 100);
    camera.lookAt(0, 0, 0); // Point camera at the center

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [buildingInput]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeBuildingModel;
