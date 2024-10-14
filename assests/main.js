//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(10 , window.innerWidth / window.innerHeight, 0.1, 1000);


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


let object;

let controls;

let objToRender = 'fpv1';


const loader = new GLTFLoader();


loader.load(
 './models/fpv1/scene.gltf',
  function (gltf) {
    
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
  
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
   
    console.error(error);
  }
);


const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("hero3d").appendChild(renderer.domElement);


camera.position.z = objToRender === "fpv1" ? 25 : 500;


const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "fpv1" ? 5 : 1);
scene.add(ambientLight);



//Render the scene
function animate() {
  requestAnimationFrame(animate);



  if (object && objToRender === "fpv1") {
    //I've played with the constants here until it looked good 
    object.rotation.x = 0.5
    for(let i=0;i<360;i++){
      object.rotation.y =  object.rotation.y + i/99999999
      // object.rotation.x = object.rotation.x + i/99999999 
    }
    
  }
  renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


document.onmousemove = (e) => {
  mouseX = e.clientX; 
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();



  