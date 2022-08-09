<template>
  <div class="three-gltf">
    <h3>载入3D模型 -- 加载</h3>
  </div>
</template>

<script>
// 引入加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
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
    loader() {
      const loader = new GLTFLoader();
      console.log(14141414, loader)
      loader.load('./path/to/model.glb', gltf => {
        this.scene.add(gltf.scene);
        console.log()
      }, process => {
        console.log(37373773, process)
      }, err => {
        console.log('出错啦', err);
      });
    }
  },
  mounted() {
    this.loader();

  }
}
</script>

<style>

</style>
