<template>
  <div class="viewer-container" ref="container">
    <div class="maskLoading" v-if="loadingPrecent < 100">
      <div class="loading">
        <div class="bar" :style="{ width: loadingPrecent + '%' }">
          <span v-if="loadingPrecent > 10">{{ loadingPrecent }} %</span>
        </div>
      </div>
    </div>
    <canvas class="viewer-canvas" ref="canvas" @click="onClick"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import {
  AmbientLight, AnimationMixer,
  AxesHelper, Clock, DirectionalLight,
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
      default: 'http://10.0.0.147:5500/gltf-models/a10.gltf'
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
        return { x: 0, y: 0, z: 0 };
      },
    },
    autoPlay: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    scale: {
      type: Object,
      default: () => {
        return { x: 1, y: 1, z: 1 };
      },
    },
    rotation: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    position: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
  },

  data() {
    return {
      loadingPrecent: 0, // 模型加载进度 %
      el: null, // this.$refs.cnavas
      width: this.width,
      height: this.height,
      object: null,
      clock: new Clock(),
      raycaster: new Raycaster(),
      scene: new Scene(),
      camera: new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000),
      renderer: null,
      controls: null,
      loader: null,
      requestAnimationId: null,
      mixer: null,
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
        if (type === 'ambient' || type === 'ambientlight') {
          light = new AmbientLight(color, intensity);
        } else if(type === 'directional' || type === 'directionallight') {
          light = new DirectionalLight(color, intensity);
        }
        if (item.position) {
          light.position.copy(item.position)
        }

        if (light) {
          this.scene.add(light)
        }
      })

    },

    initHelper() {
      const axesHelper = new AxesHelper(600);
      this.scene.add(axesHelper)
    },

    onLoader() {
      let _loader = getLoader(this.filePath);
      this.loader = _loader.loader;
      this.loader.load(this.filePath, (...args) => {
        let model = _loader.getObject(...args);
        this.object = model;
        this.scene.add(model);
        this.playAnimations(model);
        this.updateModel(model);
        this.$emit('load', this.scene, this.camera);
      }, process => {
        let { loaded, total } = process;
        console.log('process, total', process, total)
        let load = Math.abs(loaded / total * 100);
        this.loadingPrecent = load;
        this.$emit('process', process);
      }, error => {
        this.$emit('error', error);
      })
    },

    animate() {
      this.requestAnimationId = requestAnimationFrame(this.animate);
      const delta = this.clock.getDelta();
      if (this.mixer) this.mixer.update(delta);
      this.controls.update();
      this.render();
      this.$emit('animate')
    },
    playAnimations(object) {
      this.mixer = new AnimationMixer(object);
      if (this.object.animations) {
        this.object.animations.forEach(clip => {
          if (clip) {
            const action = this.mixer.clipAction(clip);
            if (!this.autoPlay) {
              action.stop();
            } else {
              action.play();
            }
          }
        });
      }
    },
    updateModel(model) {
      const { position, rotation, scale } = this;
      if (!model) return;
      if (scale) model.scale.set(scale.x, scale.y, scale.z);
      if (position) model.position.set(position.x, position.y, position.z);
      if (rotation) model.rotation.set(rotation.x, rotation.y, rotation.z);
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
      this.object.traverse(child => {
        let isEx = names.findIndex(item => { return item.name === child.name && item.type === child.type });
        if (isEx > -1) res[isEx] = child;
      });
      return res;
    },

    onClick(event) {
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
    this.init();
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
  .viewer-container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    .maskLoading {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.7);
      .loading {
        width: 400px;
        height: 16px;
        border: 1px solid #a0a0a0;
        border-radius: 10px;
        background: #fff;
        .bar {
          background: #1c2541;
          height: 100%;
          width: 0;
          text-align: center;
          border-radius: 10px;
          transition-duration: 500ms;
          transition-timing-function: ease-in;
        }
      }
    }
    .viewer-canvas {
      width: 100%;
      height: 100%;
    }
  }


</style>
