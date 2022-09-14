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
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
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
      const objLoader = new OBJLoader();
      const mtlLoader = new MTLLoader();
      mtlLoader.load('http://127.0.0.1:5501/obj-models/47-obj/obj/Handgun_obj.mtl', mtl => {
        console.log(4844848, mtl)
        mtl.preload()
        Object.keys(mtl.materials).forEach(it => {

          console.log(59595959, it, mtl.materials[it].opacity, mtl.materials[it].transparent)
          // mtl.materials[it].opacity = 1;
          mtl.materials[it].transparent = false;
          if(it === 'handgun') {
            // 这就是没有渲染出来的那部分
            mtl.materials[it].color = new THREE.Color(0xff0000);
            mtl.materials[it].opacity = 1;
          }
        })

        objLoader.setMaterials(mtl)
        objLoader.load(`http://127.0.0.1:5501/obj-models/47-obj/obj/Handgun_obj.obj`, obj => {
          console.log(46464646, obj)

          let group = new THREE.Group()
          // let objBox = new THREE.Box3().setFromObject(obj);
          group.scale.multiplyScalar(50)
          group.add(obj)
          this.mesh = group
          this.scene.add(group)
        })

      })

    },

    // 创建光源
    createLight() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 创建环境光
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
      this.renderer.outputEncoding = THREE.sRGBEncoding;
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

