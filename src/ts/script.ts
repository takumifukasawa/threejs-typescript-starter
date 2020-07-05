import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvasWrapper: HTMLElement = document.querySelector(".js-canvas-wrapper");
const canvasElement: HTMLCanvasElement = document.querySelector(".js-canvas");

const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(Math.max(window.devicePixelRatio, 1.5));
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
camera.position.set(0, 1, 4);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

scene.add(cube);

const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

let width, height;

const onWindowResize = () => {
  width = canvasWrapper.offsetWidth;
  height = canvasWrapper.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const tick = (time: number) => {
  cube.rotation.x = time * 0.001;
  cube.rotation.y = time * 0.0012;
  cube.rotation.z = time * 0.0014;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

const main = () => {
  onWindowResize();
  window.addEventListener("resize", onWindowResize);
  requestAnimationFrame(tick);
};

main();
