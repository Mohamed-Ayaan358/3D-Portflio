import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
//1
const scene = new THREE.Scene();

//2
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//3
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


//FullScreen Canvas
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


const earthTexture = new THREE.TextureLoader().load('earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
)
const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture })
)
const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
)
const venusTexture = new THREE.TextureLoader().load('venus.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: venusTexture })
)
const marsTexture = new THREE.TextureLoader().load('mars.webp');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: marsTexture })
)
const jupiterTexture = new THREE.TextureLoader().load('jupiter.jpg_large');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
)
mercury.position.x = -90;
venus.position.x = -50;
moon.position.x = -20;
mars.position.x = 23;
jupiter.position.x = 35;

mercury.position.z = 60;
venus.position.z = -50;
moon.position.z = 15;
mars.position.z = 18;
jupiter.position.z = -10;

scene.add(mercury)
scene.add(venus)
scene.add(earth)
scene.add(moon)
scene.add(mars)
scene.add(jupiter)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


// // This adds wireframe of light source
// const lightHelper=new THREE.PointLightHelper(pointLight,5);
// scene.add(lightHelper);

// // This adds a grid
// const gridHelper=new THREE.GridHelper(30,10);
// scene.add(gridHelper);

//Domelement of the mouse
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.26, 26, 26);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

//200 value for each value add a star
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  mercury.rotation.y = 0.01;
  mercury.rotation.z = 0.01;

  venus.rotation.y = 0.08;
  venus.rotation.z = 0.01;

  earth.rotation.y = 0.2;
  earth.rotation.z = 0.01;

  moon.rotation.x = 0.05;
  moon.rotation.y = 0.05;
  moon.rotation.z = 0.05;

  camera.position.x = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate()
