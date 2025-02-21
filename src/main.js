import { log } from "three/src/nodes/TSL.js";
import "./style.css";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  Color,
  MeshNormalMaterial,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

document.querySelector("#app").innerHTML = `
  <div class="fullscreen">
    <canvas class="fullscreen" id="webgl"></canvas>
  </div>
`;

let renderer, scene, camera, geometry, octopus;
const loader = new GLTFLoader();

const loadModels = () => {
  loader.load("/models/suzanne.glb", function (gltf) {
    geometry = gltf.scene.children[0].geometry;
    setup();
  });
};

const setup = () => {
  renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.querySelector("#webgl"),
  });
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setAnimationLoop(animate);

  scene = new Scene();
  scene.background = new Color(0xffffff);
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    100,
  );
  camera.position.z = 3;
  scene.add(camera);

  const material = new MeshNormalMaterial();
  octopus = new Mesh(geometry, material);
  scene.add(octopus);
};

const animate = () => {
  octopus.rotation.y += 0.01;
  renderer.render(scene, camera);
};

loadModels();
// setup();

// We're in the Torus
// We're going to load an octopus
// Maybe let's make her smooth
// I did love the bubbles
