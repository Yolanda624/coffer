<template>
  <div class="spriteTree" id="spriteTree" ref="spriteTree">

  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: "spriteTree",
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
      let url = `https://img1.baidu.com/it/u=2024001783,3094766170&fm=253&fmt=auto&app=138&f=PNG?w=510&h=500`
      let texture = new THREE.TextureLoader().load(url, obj => {
        console.log('图片加载', obj)
      }, e => {
      }, err => {
        console.log('图片加载出错了', err)
      })

      for (let i = 0; i < 100; i++) {
        let spriteMaterial = new THREE.SpriteMaterial({
          color: 0x00ff00,
          // rotation: Math.PI / 4, // 旋转精灵对象45度，弧度值
          map: texture
        });
        // 创建精灵模型对象，不需要几何体geometry
        let sprite = new THREE.Sprite(spriteMaterial)
        scene.add(sprite);
        sprite.scale.set(50, 50, 1)
        let r1 = Math.random() - 0.5
        let r2 = Math.random() - 0.5
        sprite.position.set(r1* 500, 50, r2 * 500)
      }

      // 创建地面
      let planeGeometry = new THREE.PlaneGeometry(1100, 1100)
      let planeUrl = `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Ftupian%2Fpic%2F201906%2F12%2Fcaoping-017.jpg%3Fdownload&refer=http%3A%2F%2Fimg.ivsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664680904&t=0fa85b0a8f7ae5d2b60d975a14867200`
      var planeTexture = new THREE.TextureLoader().load(planeUrl)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      let planeMaterial = new THREE.MeshLambertMaterial({
        // color: 0x999999,
        side: THREE.DoubleSide,
        map: planeTexture, // 草地，如果不设置 则就是0X999999 灰色地面
      });
      let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
      scene.add(planeMesh)
      planeMesh.rotateX(-Math.PI / 2)
      planeMesh.position.y = 0


      let point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300)
      scene.add(point)

      let ambient = new THREE.AmbientLight(0x444444)
      scene.add(ambient)

      let axesHelper = new THREE.AxesHelper(350)
      scene.add(axesHelper)

      let width = document.querySelector('#spriteTree').clientWidth
      let height = document.querySelector('#spriteTree').clientHeight
      let k = width / height
      let s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围也就越大

      // 相机设置
      // let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      camera.position.set(10, 300, 240)
      camera.lookAt(scene.position)

      // 创建渲染对象
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      renderer.setClearColor(0xb9d3ff, 1)
      document.querySelector('#spriteTree').appendChild(renderer.domElement)
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
.spriteTree {
  width: 800px;
  height: 500px;
}
</style>
