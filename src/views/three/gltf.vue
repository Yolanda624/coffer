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

      // 渲染器renderer的domElement元素表示渲染器中的画布。所有的渲染都是画在domElement上的
      document.body.appendChild(this.renderer.domElement);
      this.camera.position.set(0, 0, 50);
      this.camera.lookAt(0, 0, 0);
    },
    loader() {
      const loader = new GLTFLoader();
      const url = 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf'
      // const url = './path/to/model.glb'
      loader.load(url, gltf => {
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
    this.createScene();
    this.loader();

  }
}
</script>

<style>

</style>
