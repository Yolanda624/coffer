<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      mesh: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.createScene() // 创建场景
      this.loadCollada() // 加载Collada模型
      this.createLight() // 创建光源
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene()
    },
    // 加载Collada模型
    loadCollada() {
      const daeLoader = new ColladaLoader()
      const mtlLoader = new MTLLoader()
      mtlLoader.load(`http://127.0.0.1:5501/dae-models/dog-dae/Wolf_One_dae.dae`)
      loader.load(`http://127.0.0.1:5501/dae-models/dog-dae/Wolf_One_dae.dae`, obj => {

      })
    },

    // 创建光源
    createLight() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 1) // 创建环境光
      this.scene.add(ambientLight) // 将环境光添加到场景

      // const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
      // spotLight.position.set(150, 150, 150)
      // spotLight.intensity = 2
      // this.scene.add(spotLight)
    },
    // 创建相机
    createCamera() {
      const element = document.getElementById('container')
      const width = element.clientWidth // 窗口宽度
      const height = element.clientHeight // 窗口高度
      const k = width / height // 窗口宽高比
      // PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 1000)
      this.camera.position.set(0, 0, 200) // 设置相机位置
      this.camera.lookAt(new THREE.Vector3(0, 1, 0)) // 设置相机方向
      this.scene.add(this.camera)
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById('container')
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
      // this.renderer.shadowMap.enabled = true // 显示阴影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.setClearColor(0x3f3f3f, 1) // 设置背景颜色
      element.appendChild(this.renderer.domElement)
    },

    render() {
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      // 没起作用
      // this.controls = new TrackballControls(this.camera, this.renderer.domElement);
      // this.controls.rotateSpeed = 1.0;
      // this.controls.zoomSpeed = 1.2;
      // this.controls.panSpeed = 0.8;
      //
      // this.controls.staticMoving = true;
      // this.controls.dynamicDampingFactor = 0.3;
      //
      // this.controls.keys = [ 65, 83, 68 ];
      //
      // this.controls.addEventListener('change', this.renderer);
    }
  }
}
</script>
<style>
#container {
  position: absolute;
  width: 500px;
  height: 500px;
}
</style>

