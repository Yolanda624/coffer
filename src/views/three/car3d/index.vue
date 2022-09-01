<template>
  <div class="card3d-index" ref="car3d" id="car3d">
    <div class="maskLoading" v-if="isLoading">
      <div class="loading">
        <div :style="{ width: loadingWidth + '%' }"></div>
      </div>
    </div>
    <div class="mask">
      <button @click="isAuthRotate">旋转</button>
      <button @click="stopRotate">停止</button>
      <p>x:{{cameraMap.x}} y:{{cameraMap.y}} z:{{cameraMap.z}} </p>
      <div class="flex">
        车身颜色：
        <div v-for="color in colors" :style="{background: color}" @click="switchCarBodyColor(color)"></div>
      </div>
      <b>点击车轱辘随机改变颜色</b>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "index",
  components: {},
  props: {},

  data() {
    return {
      viewBox: {
        width: 0,
        height: 0,
        offsetLeft: 0,
        offsetTop: 0
      },
      scene: null, // 场景
      render: null, // 渲染器
      camera: null, // 相机
      ambientLight: null, // 环境光
      directionalLight: null, // 方向光
      dHelper: null, // 方向光 开发者辅助
      hemisphereLight: null, // 放射光
      hHelper: null,
      controls: null, //
      loader: new GLTFLoader(), // 加载器

      isLoading: false, //
      loadingWidth: 0, //

      // 相机的默认配置
      cameraMap: {
        x: 510,
        y: 128,
        z: 0
      },
      colors: [
        "rgb(216, 27, 67)", "rgb(142, 36, 170)", "rgb(81, 45, 168)", "rgb(48, 63, 159)", "rgb(30, 136, 229)", "rgb(0, 137, 123)",
        "rgb(67, 160, 71)", "rgb(251, 192, 45)", "rgb(245, 124, 0)", "rgb(230, 74, 25)", "rgb(233, 30, 78)", "rgb(156, 39, 176)",
        "rgb(0, 0, 0)"
      ], // 车身颜色数组

      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster()


    };
  },

  computed: {},

  watch: {},

  methods: {
    async init() {
      this.viewBox = {
        width: this.$refs.car3d.clientWidth,
        height: this.$refs.car3d.clientHeight,
        offsetLeft: this.$refs.car3d.offsetLeft,
        offsetTop: this.$refs.car3d.offsetTop,
      }
      this.setScene();
      await this.loadModel();
      this.setCamera();
      this.setLight();
      this.setControls();
      this.loop()

      this.$refs.car3d.addEventListener('click', this.onMouseClick, false)
    },

    // 创建场景
    setScene() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.viewBox.width, this.viewBox.height);
      // this.renderer.setClearColor(0xdfdfdf)
      document.querySelector('#car3d').appendChild(this.renderer.domElement);
    },

    setCamera() {
      const { x, y, z } = this.cameraMap;
      this.camera = new THREE.PerspectiveCamera(60, this.viewBox.width / this.viewBox.height, 1, 1000);
      this.camera.position.set(x, y, z);
    },

    // 灯光
    setLight() {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 创建环境光
      this.scene.add(this.ambientLight) // 将环境光添加到场景

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      this.directionalLight.position.set(-4, 8, 4)
      this.dHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5, 0xff0000)

      this.hemisphereLight = new THREE.HemisphereLight(0XFFFFFF, 0XFFFFFF, 0.4)
      this.hemisphereLight.position.set(0, 8, 0)
      this.hHelper = new THREE.HemisphereLightHelper(this.hemisphereLight, 5)

      this.scene.add(this.directionalLight, this.hemisphereLight)
    },

    setControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxPolarAngle = 0.9 * Math.PI / 2;
      this.controls.enabledZoom = true;
      this.controls.autoRotate = true;
      // this.controls.addEventListener('change', this.renderFun);
    },

    renderFun() {
      this.cameraMap.x = Number.parseInt(this.camera.position.x)
      this.cameraMap.y = Number.parseInt(this.camera.position.y)
      this.cameraMap.y = Number.parseInt(this.camera.position.y)
    },

    async loadModel() {
      this.isLoading = true;
      const gltf = await this.loadFile('http://127.0.0.1:5500/tesla/scene.gltf');
      this.isLoading = false;
      this.scene.add(gltf.scene);
    },

    loadFile(url) {
      return new Promise((resolve, reject) => {
        this.loader.load(url, gltf => {
          resolve(gltf);
        }, ({ loaded, total }) => {
          let load = Math.abs(loaded / total * 100);
          this.loadingWidth = load;
          console.log((loaded / total * 100) + "% loaded");
        }, err => {
          reject(err);
        });
      });
    },

    isAuthRotate() {
      this.controls.autoRotate = true;
    },

    stopRotate() {
      this.controls.autoRotate = false;
    },

    // 改变车身颜色
    switchCarBodyColor(c) {
      const color = new THREE.Color(c)
      this.scene.traverse(child => {
        if (child.isMesh) {
          console.log(child.name)
          if (child.name.includes('door_')) {
            child.material.color.set(color);
          }
        }
      })
    },

    onMouseClick(event) {
      console.log('event', event.clientX, event.clientY, )
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1 到 1
      this.mouse.x = ((event.clientX - this.viewBox.offsetLeft) / this.viewBox.width) * 2 - 1
      this.mouse.y = -((event.clientY - this.viewBox.offsetTop) / this.viewBox.height) * 2 + 1
      // console.log('点击', this.mouse)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      let intersects = this.raycaster.intersectObjects(this.scene.children)
      // console.log('******intersects******', intersects)
      for (let i = 0, len = intersects.length; i < len; i++) {
        console.log('**** NAME ****', intersects[i].object.name)
        if (intersects[i].object.name.includes('wheels')) {
          // console.log(180, intersects[i].object)
          let color = Math.random() * 16 * 0xffffff
          intersects[i].object.material.color.set(color)
        }
      }
    },


    // 帧循环
    loop() {
      requestAnimationFrame(this.loop)
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
    }



  },

  created() {
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.card3d-index {
  width: 900px;
  height: 800px;
  position: relative;
  color: #ffffff;
  .maskLoading {
    background: #000;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1111111;
    color: #ffffff;
  }

  .maskLoading .loading {
    width: 400px;
    height: 20px;
    border: 1px solid #fff;
    background: #000;
    overflow: hidden;
    border-radius: 10px;

  }

  .maskLoading .loading div {
    background: #fff;
    height: 20px;
    width: 0;
    transition-duration: 500ms;
    transition-timing-function: ease-in;
  }

  canvas {
    width: 100%;
    height: 100%;
    margin: auto;
  }

  .mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  .flex div {
    width: 10px;
    height: 10px;
    margin: 5px;
    cursor: pointer;
  }

}
</style>
