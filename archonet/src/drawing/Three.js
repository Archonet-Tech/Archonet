// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// // Create a Three.js scene to hold the 3D elements
// const create3DHome = (polygonCoords) => {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   // Lighting
//   const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
//   scene.add(ambientLight);

//   // Floor
//   const floorGeometry = new THREE.PlaneGeometry(10, 10);  // Change size based on polygon size
//   const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
//   const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//   floor.rotation.x = - Math.PI / 2; // Rotate to make it horizontal
//   scene.add(floor);

//   // Walls
//   const wallHeight = 3;
//   const wallThickness = 0.2;

//   const wall1Geometry = new THREE.BoxGeometry(10, wallHeight, wallThickness);  // Front Wall
//   const wall1Material = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
//   const wall1 = new THREE.Mesh(wall1Geometry, wall1Material);
//   wall1.position.set(0, wallHeight / 2, 5);  // Adjust position
//   scene.add(wall1);

//   // Create more walls (you need 4 walls for a basic room)
//   const wall2Geometry = new THREE.BoxGeometry(10, wallHeight, wallThickness);  // Back Wall
//   const wall2 = new THREE.Mesh(wall2Geometry, wall1Material);
//   wall2.position.set(0, wallHeight / 2, -5);
//   scene.add(wall2);

//   const wall3Geometry = new THREE.BoxGeometry(wallThickness, wallHeight, 10);  // Left Wall
//   const wall3 = new THREE.Mesh(wall3Geometry, wall1Material);
//   wall3.position.set(5, wallHeight / 2, 0);
//   scene.add(wall3);

//   const wall4Geometry = new THREE.BoxGeometry(wallThickness, wallHeight, 10);  // Right Wall
//   const wall4 = new THREE.Mesh(wall4Geometry, wall1Material);
//   wall4.position.set(-5, wallHeight / 2, 0);
//   scene.add(wall4);

//   // Doors (using GLTF model loader for complex models)
//   const loader = new GLTFLoader();
//   loader.load('path_to_your_door_model.gltf', function (gltf) {
//     const door = gltf.scene;
//     door.position.set(0, 1, 5);  // Adjust to match the door position
//     scene.add(door);
//   }, undefined, function (error) {
//     console.error(error);
//   });

//   // Camera position
//   camera.position.z = 15;

//   // Render loop
//   const animate = () => {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   };

//   animate();
// };
