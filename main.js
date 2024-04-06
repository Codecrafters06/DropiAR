import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const gltf = await loadGLTF('./assets/Dropi3D.glb');
    gltf.scene.scale.set(3, 3, 3);
    gltf.scene.position.set(0, -0.2, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(gltf.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {

      renderer.render(scene, camera);
    });
  }
  start();
});
