<template>
  <div>
    <h3>
      三维模型上加文字标签最常用的方法应该就是（DOM + CSS）基于传统html5的文字实现，用于添加描述性叠加文字的方法。具体实现是声明一个绝对定位的DIV，并且保证z-index够大，保证能够显示在3D场景之上。然后计算三维坐标对应的二维坐标，根据二维坐标去设置DIV的left和top属性，让DIV在需要的位置进行展示。这种方式实现简单，DIV可方便使用页面CSS效果进行UI设置。
    </h3>
    <div class="model3d" ref="model3d" id="model3d"></div>
    <div class="box box1">这是文字标签1</div>
    <div class="box box2">这是文字标签2</div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
export default {
  name: "index",
  components: {},
  props: {},

  data() {
    let scene, camera, renderer, control, clock, mixer;

    return {
      viewBox: {
        width: 0,
        height: 0,
        offsetLeft:0,
        offsetTop: 0,
      },

      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),

      scene: null,
      camera: null,
      renderer: null,
      css2dRenderer: null,
      control: null,
      clock: null,
      mixer: null
    };
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      this.viewBox = {
        width: this.$refs.model3d.clientWidth,
        height: this.$refs.model3d.clientHeight,
        offsetLeft: this.$refs.model3d.offsetLeft,
        offsetTop: this.$refs.model3d.offsetTop,
      }

      this.clock = new THREE.Clock();
      // 场景，相机
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf2f2f2);
      // this.scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 )
      // 设置场景的背景色
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      this.camera.position.set(710, 0, 0);

      // 渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.viewBox.width, this.viewBox.height);
      this.$refs.model3d.appendChild(this.renderer.domElement);

      // 2D渲染器
      this.css2dRenderer = new CSS2DRenderer()
      this.css2dRenderer.setSize(this.viewBox.width, this.viewBox.height)
      this.css2dRenderer.domElement.style.position = 'absolute'
      this.css2dRenderer.domElement.style.top = 0;
      this.$refs.model3d.appendChild(this.css2dRenderer.domElement)

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
      const environment = new RoomEnvironment();
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmremGenerator.fromScene(environment).texture;

      //   灯光
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.1));

      const light = new THREE.DirectionalLight(0xffffff);
      // light.position.set(0, 20, 20)

      light.castShadow = true;
      light.shadow.camera.top = 10;
      light.shadow.camera.bottom = -10;
      light.shadow.camera.left = -10;
      light.shadow.camera.right = 10;

      // 告诉平行光需要开启阴影投射
      light.castShadow = true;
      // this.scene.add(light)

      // 控制器
      this.control = new OrbitControls(this.camera, this.css2dRenderer.domElement);

      const axesHelper = new THREE.AxesHelper(540);
      this.scene.add(axesHelper);
      this.onLoader();
      this.animate();

      let sign = this.createLabel('中秋佳节');
      this.scene.add(sign)

      window.addEventListener('click', this.onMouseClick, false)

    },

    createLabel(text, vector) {
      let div = document.createElement('div')
      div.className = 'label-demo'
      div.textContent = '这是这是这' + text
      let pointLabel = new CSS2DObject(div)
      // pointLabel.position.set(vector.x, vector.y, vector.z)
      pointLabel.position.set(0.5, 0.5, 0.5)
      return pointLabel
    },


    onLoader() {
      const loader = new GLTFLoader()
        .setPath('http://10.0.0.147:5500/')
        .setDRACOLoader(new DRACOLoader().setDecoderPath(''));

      loader.load('a1.gltf', (gltf) => {
        console.log(9999, gltf);
        // gltf.scene.scale.set(80, 80, 80)
        // this.mixer = new THREE.AnimationMixer(gltf.scene)
        // this.mixer.clipAction(gltf.animations[0]).play()
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            // child.frustumCulled = false;
            // // //模型阴影
            // child.castShadow = true;

            // // //模型自发光
            child.material.emissive = child.material.color;
            child.material.emissiveMap = child.material.map;
            // child.material.color = new THREE.Color(0xff0000);
          } else {
            console.log('=====', child);
          }
        });
        // this.scene.add(gltf.scene);
      });
    },

    animate() {
      requestAnimationFrame(this.animate);
      if (this.mixer) this.mixer.update(this.clock.getDelta());
      this.control.update(); // required if damping enabled
      this.render();
    },

    render() {
      this.renderer.render(this.scene, this.camera);

    },

    onMouseClick(event) {
      console.log('event', event.clientX, event.clientY, )
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1 到 1
      this.mouse.x = ((event.clientX - this.viewBox.offsetLeft) / this.viewBox.width) * 2 - 1
      this.mouse.y = -((event.clientY - this.viewBox.offsetTop) / this.viewBox.height) * 2 + 1
      // console.log('点击', this.mouse)
      this.raycaster.setFromCamera(this.mouse, this.camera)

      console.log(164164, this.mouse)


      let intersects = this.raycaster.intersectObjects(this.scene.children)
      // console.log('******intersects******', intersects)
      // for (let i = 0, len = intersects.length; i < len; i++) {
      //   console.log('**** NAME ****', intersects[i].object)
      //   if (intersects[i].object.name.includes('wheels')) {
      //     // console.log(180, intersects[i].object)
      //     let color = Math.random() * 16 * 0xffffff
      //     intersects[i].object.material.color.set(color)
      //   }
      // }
    },

    // 坐标转换
    // 这个方法好像不是很正确
    tran2dPos() {
      let cameraPosition = this.camera.position;
      let vectSphere = new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z)
      let posiSphere = vectSphere.project(this.camera)
      console.log('降维后的坐标时：', posiSphere)
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
.model3d {
  height: 500px;
  width: 800px;
}
.box {
  position: absolute;
  top: 0;
  width: 150px;
  height: 120px;
  text-align: center;
  z-index: 100;
  display:block;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  line-height: 1;
  border-radius: 5px;
  border: 1px solid pink;
}
</style>
