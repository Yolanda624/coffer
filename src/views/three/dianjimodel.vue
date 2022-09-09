<template>
  <div></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
export default {
  name: "index",
  components: {},
  props: {},

  data() {

    let scene, camera, renderer, control, clock, mixer

    return {

      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),

      scene: null,
      camera: null,
      renderer: null,
      control: null,
      clock:null,
      mixer: null
    };
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      this.clock = new THREE.Clock()
      // 场景，相机
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xf2f2f2)
      // this.scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 )
      // 设置场景的背景色
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      )
      this.camera.position.set(710, 0, 0)

      // 渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)

      // 地表格
      // const grid = new THREE.GridHelper(500, 10, 0x000000, 0x000000)
      // grid.material.opacity = 0.1
      // grid.material.depthWrite = true
      // grid.material.transparent = true
      //
      // // this.grid = new THREE.GridHelper( 100, 40, 0x000000, 0x000000 )
      //
      // this.scene.add(grid)

      // 材质
      const environment = new RoomEnvironment()
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
      this.scene.environment = pmremGenerator.fromScene(environment).texture

      //   灯光
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.1))

      const light = new THREE.DirectionalLight(0xffffff)
      // light.position.set(0, 20, 20)

      light.castShadow = true
      light.shadow.camera.top = 10
      light.shadow.camera.bottom = -10
      light.shadow.camera.left = -10
      light.shadow.camera.right = 10

      // 告诉平行光需要开启阴影投射
      light.castShadow = true
      // this.scene.add(light)

      // 控制器
      this.control = new OrbitControls(this.camera, this.renderer.domElement)

      const axesHelper = new THREE.AxesHelper(140)
      this.scene.add(axesHelper)
      this.onLoader()
      this.animate()

      this.$refs.car3d.addEventListener('click', this.onMouseClick, false)

    },

    onLoader() {
      const loader = new GLTFLoader()
        // .setPath('http://10.0.0.147:5501/gltf-models/')
        // .setDRACOLoader(new DRACOLoader().setDecoderPath(''))

      loader.load('http://10.0.0.147:5501/gltf-models/a1.gltf', (gltf) => {
        console.log(9999, gltf)
        // gltf.scene.scale.set(80, 80, 80)
        // this.mixer = new THREE.AnimationMixer(gltf.scene)
        // this.mixer.clipAction(gltf.animations[0]).play()
        gltf.scene.traverse( function ( child ) {
          if (child.isMesh ) {

            // child.frustumCulled = false;
            // // //模型阴影
            // child.castShadow = true;

            // // //模型自发光
            // child.material.emissive = child.material.color;
            // child.material.emissiveMap = child.material.map;
            // child.material.color = new THREE.Color(0xff0000);
          } else {
            console.log('=====', child)
          }
        })
        this.scene.add(gltf.scene)
      })
    },

    animate() {
      requestAnimationFrame(this.animate)
      if (this.mixer) this.mixer.update(this.clock.getDelta())
      this.control.update() // required if damping enabled
      this.render()
    },

    render() {
      this.renderer.render(this.scene, this.camera)
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
      console.log('event', event.clientX, event.clientY,)
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1 到 1
      this.mouse.x = ((event.clientX - this.viewBox.offsetLeft) / this.viewBox.width) * 2 - 1
      this.mouse.y = -((event.clientY - this.viewBox.offsetTop) / this.viewBox.height) * 2 + 1
      // console.log('点击', this.mouse)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      let intersects = this.raycaster.intersectObjects(this.scene.children)
      // console.log('******intersects******', intersects)
      for (let i = 0, len = intersects.length; i < len; i++) {
        console.log('**** NAME ****', intersects[i].object)
        if (intersects[i].object.name.includes('wheels')) {
          // console.log(180, intersects[i].object)
          let color = Math.random() * 16 * 0xffffff
          intersects[i].object.material.color.set(color)
        }
      }
    },



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
