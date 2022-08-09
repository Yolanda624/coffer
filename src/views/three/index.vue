<template>
  <div>
    <h4>学习threejs</h4>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null, // 立方体
    }
  },
  methods: {
    createScene() {
      // 创建场景
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      this.camera.position.set(0, 0, 50);
      this.camera.lookAt(0, 0, 0);
    },
    drawBox() {
      // 绘制立方体
      const geometry = new THREE.BoxGeometry(8, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
    },

    drawLine() {
      //create a blue LineBasicMaterial
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const points = [];
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(10, 0, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      this.renderer.render(this.scene, this.camera);
    },
    // drawText() {

    //   const textLoader = new FontLoader();
    //   const url = './fonts/helvetiker_regular.typeface.json';

    //   textLoader.load(url, font => {
    //     const geometry = new THREE.TextGeometry('这就是一串文字', {
    //       font: font,
    //       size: 80,
    //       height: 5,
    //       curveSegments: 12,
    //       bevelEnabled: true,
    //       bevelThickness: 10,
    //       bevelSize: 8,
    //       bevelSegments: 5
    //     });
    //     var meshMaterial = new THREE.MeshNormalMaterial({
    //       flatShading: THREE.FlatShading,
    //       transparent: true,
    //       opacity: 0.9,
    //       color: 0xeeffff
    //     });
    //     var mesh = new THREE.Mesh(geometry, meshMaterial);
    //     mesh.position.set(40, -30, -60);

    //     this.scene.add(mesh);
    //   })

    // },
    render() {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.createScene();
    this.drawBox();
    this.drawLine();
    // this.drawText();
    this.render();
  }
}
</script>

<style>
</style>
