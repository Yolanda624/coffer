<template>
  <div class="model-loader-index">
    <div class="viewer-container" ref="container">
      <canvas class="viewer-canvas" ref="canvas" @click="onClick"></canvas>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {
  AmbientLight,
  AxesHelper, DirectionalLight,
  LinearEncoding,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene, sRGBEncoding, Vector2,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getLoader } from "./loaderModel";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import * as THREE from "three";

export default {
  name: "model-loader",
  components: {},
  props: {
    filePath: {
      type: String,
      default: 'http://10.0.0.147:5500/a10.gltf'
    },
    outputEncoding: {
      type: String,
      default: 'linear',
      validator(value) {
        // The value must match one of these strings
        return ['linear', 'sRGB'].includes(value);
      }
    },
    lights: {
      type: Array,
      default: () => {
        return [
          {
            type: "AmbientLight",
            color: 0xffffff,
            intensity: 1
          },
          {
            type: "DirectionalLight",
            position: { x: 10000, y: 1, z: 1 },
            color: 0xffffff,
            intensity: 0.8,
          },
        ];
      },
    },
    cameraPosition: {
      type: Object,
      default: () => {
        return { x: 1200, y: 0, z: 0 };
      },
    }
  },

  data() {
    return {
      el: null, // this.$refs.container
      width: this.width,
      height: this.height,
      object: null,
      raycaster: new Raycaster(),
      scene: new Scene(),
      camera: new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000),
      renderer: null,
      controls: null,
      loader: null,
      requestAnimationId: null
    };
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      this.initRenderer();
      this.initCamera();
      this.initLights();
      this.initControls();
      this.initHelper();
      this.onLoader();
      this.animate();
    },
    initRenderer() {
      let canvas = this.$refs.canvas;
      this.el = canvas;
      this.renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvas
      });
      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      this.renderer.hadowMapEnabled = true;
      this.renderer.shadowMap.enabled = true;
      this.renderer.outputEncoding = this.outputEncoding === "linear" ? LinearEncoding : sRGBEncoding;

      // // 材质
      // const environment = new RoomEnvironment();
      // const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      // this.scene.environment = pmremGenerator.fromScene(environment).texture;
      // // this.scene.environment = new RGBELoader().load('./venice_sunset_2k.hdr')
      // this.scene.environment.mapping = THREE.EquirectangularReflectionMapping;

      },
    initControls() {
      this.controls = new OrbitControls(this.camera, this.el);
    },

    initCamera() {
      const { cameraPosition } = this;
      this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    },

    initLights() {
      const { lights } = this;
      lights.forEach(item => {
        if(!item.type) return;
        const type = item.type.toLowerCase();
        let light = null;
        const color = item.color || 0xffffff;
        const intensity = item.intensity || 1;
        if(type === 'ambient' || type === 'ambientlight') {
          light = new AmbientLight(color, intensity);
        } else if(type === 'directional' || type === 'directionallight') {
          light = new DirectionalLight(color, intensity);
        }
        if(item.position) {
          light.position.copy(item.position)
        }

        if(light) {
          this.scene.add(light)
        }
      })

    },

    initHelper() {
      const axesHelper = new AxesHelper(600);
      this.scene.add(axesHelper)
    },

    onLoader() {
      this.loader = new GLTFLoader()
      this.loader.load(this.filePath, gltf => {
        this.scene.add(gltf.scene)
        this.$emit('load', this.scene, this.camera);
      }, process => {
        this.$emit('process', process);
      }, error => {
        this.$emit('error', error);
      })
    },

    animate() {
      this.requestAnimationId = requestAnimationFrame(this.animate);
      // this.updateStats();
      // const delta = this.clock.getDelta();
      // if (this.mixer) this.mixer.update(delta);
      this.controls.update();
      this.render();
      this.$emit('animate')
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      this.$emit('render', this.scene, this.camera, this.controls);
    },


    // *通过name集合获取模型集合
    //     names = [{ name: 'sensor', type: 'Mesh' }, { name: 'fire', type: 'Object3D' }]
    //   return [Object3D]
    // */
    getMesh(names = []) {
      if (names instanceof Array && names.length === 0) return [];
      let res = [];
      console.log(184, names)
      this.scene.traverse(child => {
        let isEx = names.findIndex(item => { return item.name === child.name && item.type === child.type });
        if (isEx > -1) res[isEx] = child;
      });
      return res;
    },

    onClick(event) {
      console.log('点击啦')
      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('click', event, intersected);
    },
    pick(x, y) {
      if (!this.$refs.container || !this.$refs.canvas) return;
      const rect = this.$refs.canvas.getBoundingClientRect();
      const mouse = new Vector2(0, 0);
      mouse.x = (x - rect.left) / rect.width * 2 - 1;
      mouse.y = -(y - rect.top) / rect.height * 2 + 1;
      this.raycaster.setFromCamera(mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.scene)
      return intersects;
    }
  },

  created() {
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    cancelAnimationFrame(this.requestAnimationId);
    this.renderer.dispose();
    if (this.controls) {
      this.controls.dispose();
    }
  }
};
</script>

<style lang='less' scoped>
.model-loader-index {
  width: 900px;
  height: 600px;
  .viewer-container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
    padding: 0;
  }

  .viewer-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
