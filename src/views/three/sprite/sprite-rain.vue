<template>
  <div class="spriteRain" id="spriteRain" ref="spriteRain">

  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: "spriteRain",
  components: {},
  props: {},

  data() {
    return {
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
      let group = new THREE.Group();


      for (let i = 0; i < 100; i++) {
        let spriteMaterial = new THREE.SpriteMaterial({
          color: 0x00ff00,
          // rotation: Math.PI / 4, // 旋转精灵对象45度，弧度值
          map: texture
        });
        // 创建精灵模型对象，不需要几何体geometry
        let sprite = new THREE.Sprite(spriteMaterial)
        sprite.scale.set(8, 10, 1)
        let r1 = Math.random() - 0.5
        let r2 = Math.random() - 0.5
        let r3 = Math.random() - 0.5
        sprite.position.set(r1 * 500, r2 * 300, r3 * 500)
        group.add(sprite)
      }
      scene.add(group);

      // 精灵模型的分布空间范围是(0,-150,-300)到(600,150,300)对角线构成的长方体空间中,相机的位置是(220, 100, 220)。


      // 创建地面
      let planeGeometry = new THREE.PlaneGeometry(1100, 1100)
      let planeUrl = `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Ftupian%2Fpic%2F201906%2F12%2Fcaoping-017.jpg%3Fdownload&refer=http%3A%2F%2Fimg.ivsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664680904&t=0fa85b0a8f7ae5d2b60d975a14867200`
      let planeTexture = new THREE.TextureLoader().load(planeUrl)
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

      let width = document.querySelector('#spriteRain').clientWidth
      let height = document.querySelector('#spriteRain').clientHeight
      let k = width / height
      let s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围也就越大

      // 相机设置
      // let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      camera.position.set(220, 100, 220)
      camera.lookAt(scene.position)

      // 创建渲染对象
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      renderer.setClearColor(0xb9d3ff, 1)
      document.querySelector('#spriteRain').appendChild(renderer.domElement)
      renderer.render(scene, camera)

      let T0 = new Date()
      function render() {
        // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
        // 每次渲染都会更新雨滴的位置，进而产生动画效果
        group.children.forEach(sprite => {
          sprite.position.y -= 1
          // sprite.position.x -= 1
          // sprite.position.z -= 1
          if (sprite.position.y < 0) {
            // 已经落到地面，此时需要重置y, 从新下落
            sprite.position.y = 200
          }
        })
        renderer.render(scene, camera)
        requestAnimationFrame(render)
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
.spriteRain {
  width: 800px;
  height: 500px;
}
</style>
