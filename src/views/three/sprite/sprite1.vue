<template>
  <div class="sprint1" id="sprite1" ref="sprite1">

  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: "sprite1",
  components: {},
  props: {},

  data() {
    return {
      scene: null, //
      renderer: null,
      ambient: null, //
      controls: null,
      camera: null
    };
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      let scene = new THREE.Scene()
      let texture = new THREE.TextureLoader().load('https://aes.aes-iot.com:8302/file/img/font/logo_icon.png', obj => {
        console.log('图片加载', obj)
      })
      let spriteMaterial = new THREE.SpriteMaterial({
        color: 0xff00ff,
        rotation: Math.PI / 4, // 旋转精灵对象45度，弧度值
        map: texture
      });
      // 创建精灵模型对象，不需要几何体geometry
      let sprite = new THREE.Sprite(spriteMaterial)
      scene.add(sprite);
      sprite.scale.set(50, 50, 1)

      let point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300)
      scene.add(point)

      let ambient = new THREE.AmbientLight(0x444444)
      scene.add(ambient)

      let axesHelper = new THREE.AxesHelper(350)
      scene.add(axesHelper)

      let width = document.querySelector('#sprite1').clientWidth
      let height = document.querySelector('#sprite1').clientHeight
      let k = width / height
      let s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围也就越大

      // 相机设置
      let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      camera.position.set(200, 300, 200)
      camera.lookAt(scene.position)

      // 创建渲染对象
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      renderer.setClearColor(0xb9d3ff, 1)
      document.querySelector('#sprite1').appendChild(renderer.domElement)
      renderer.render(scene, camera)

      let T0 = new Date()
      function render() {
        let T1 = new Date()
        let t = T1 - T0
        T0 = T1
        requestAnimationFrame(render)
        renderer.render(scene, camera)
      }
      render()

      let controls = new OrbitControls(camera, renderer.domElement)
    }
  },

  created() {
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.sprint1 {
  width: 500px;
  height: 500px;
}
</style>
