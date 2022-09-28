<template>
  <div>
    <h3>
      三维模型上加文字标签最常用的方法应该就是（DOM + CSS）基于传统html5的文字实现，用于添加描述性叠加文字的方法。具体实现是声明一个绝对定位的DIV，并且保证z-index够大，保证能够显示在3D场景之上。然后计算三维坐标对应的二维坐标，根据二维坐标去设置DIV的left和top属性，让DIV在需要的位置进行展示。这种方式实现简单，DIV可方便使用页面CSS效果进行UI设置。
    </h3>

    <div class="box box1" ref="box1">这是盒子1</div>
    <!--    <div class="box box1">这是盒子2</div>-->
    <!--    <div class="box box1">这是盒子3</div>-->
    <!--    <div class="box box1">这是盒子4</div>-->
    <!--    <div class="tag tag2">这是文字标签2</div>-->

    <div class="model3d" ref="model3d" id="model3d">
      <div class="tag tag1" ref="tag1"></div>
<!--      <div class="tag tag1" ref="tag2">这是文字标签1</div>-->
<!--      <div class="tag tag1" ref="tag3">这是文字标签1</div>-->
      <canvas class="model3d-canvas" ref="canvas"></canvas>
    </div>

  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import LeaderLine from 'leader-line'

export default {
  name: "index",
  components: {},
  props: {},

  data() {
    let scene, camera, renderer, control, clock, mixer;

    return {
      el: null,
      viewtag: {
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
      mixer: null,

      labels: []
    };
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      this.viewtag = {
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
      this.camera.position.set(1200, 0, 0);

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.$refs.canvas });
      // this.renderer.setSize(this.viewtag.width, this.viewtag.height);
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      // this.renderer.toneMappingExposure = 1;
      this.$refs.model3d.appendChild(this.renderer.domElement);

      // 材质
      const environment = new RoomEnvironment();
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmremGenerator.fromScene(environment).texture;
        // this.scene.environment = new RGBELoader().load('./venice_sunset_2k.hdr')
      this.scene.environment.mapping = THREE.EquirectangularReflectionMapping;

      //   灯光
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      this.scene.add(new THREE.DirectionalLight(0xffffff, 0.05));


      // 控制器
      // this.control = new OrbitControls(this.camera, this.renderer.domElement);
      this.control = new OrbitControls(this.camera, this.el);
      // this.control.enablePan = false; // 禁用摄像机平移

      const axesHelper = new THREE.AxesHelper(540);
      this.scene.add(axesHelper);
      this.onLoader();
      this.animate();

      window.addEventListener('click', this.onMouseClick, false)
    },


    onLoader() {
      const loader = new GLTFLoader()
        .setPath('http://10.0.0.147:5500/')
        .setDRACOLoader(new DRACOLoader().setDecoderPath(''));

      loader.load('a10.gltf', (gltf) => {
        console.log(9999, gltf);
        // gltf.scene.scale.set(80, 80, 80)
        // this.mixer = new THREE.AnimationMixer(gltf.scene)
        // this.mixer.clipAction(gltf.animations[0]).play()
        gltf.scene.traverse(child => {
          if (child.isMesh) {
            // child.frustumCulled = false;
            // // //模型阴影
            // child.castShadow = true;

            // // //模型自发光
            // child.material.emissive = child.material.color;
            // child.material.emissiveMap = child.material.map;
            // child.material.color = new THREE.Color(0xff0000);
          } else {
            console.log('isObject', child)
            if (child.name === '传感器1_1') {
              this.labels.push(child)

            }
          }
        });
        this.scene.add(gltf.scene);
      });
    },

    animate() {
      requestAnimationFrame(this.animate);
      if (this.mixer) this.mixer.update(this.clock.getDelta());
      this.control.update(); // required if damping enabled
      this.render();
    },

    render() {
      let label1 = this.labels[0]
      label1 && this.addLabelTag(this.camera, label1.position)
      this.renderer.render(this.scene, this.camera);
      this.addLeaderLine()
    },

    addLabelTag(camera, position, webglDOM) {
      webglDOM = this.$refs.model3d;
      if (!webglDOM) return;
      let { width, height } = webglDOM.getBoundingClientRect();
      let worldVector = new THREE.Vector3(position.x, position.y, position.z);
      let vector = worldVector.project(camera)
      console.log('转换后', vector.x, vector.y, width, height)

      let halfWidth = width / 2;
      let halfHeight = height / 2;
      console.log(165165, vector.x, vector.y, vector.z)
      let x = Math.round(vector.x * halfWidth + halfWidth)
      let y = Math.round(-vector.y * halfHeight + halfHeight)

      let targetDOM = this.$refs.tag1;
      targetDOM.style.left = x + 'px';
      targetDOM.style.top = y + 'px';
    },

    addLeaderLine() {
      let startDom = this.$refs.tag1
      let endDom = this.$refs.box1
      if (this.labels[0] && this.labels[0].leaderLine) {
        this.labels[0].leaderLine.remove()
        this.labels[0].leaderLine = null
      }
      this.labels[0] && (this.labels[0].leaderLine = new LeaderLine(startDom, endDom))

    },

    onMouseClick(event) {
      console.log('event', event.clientX, event.clientY, )
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1 到 1
      this.mouse.x = ((event.clientX - this.viewtag.offsetLeft) / this.viewtag.width) * 2 - 1
      this.mouse.y = -((event.clientY - this.viewtag.offsetTop) / this.viewtag.height) * 2 + 1
      // console.log('点击', this.mouse)
      this.raycaster.setFromCamera(this.mouse, this.camera)

      console.log(164164, this.mouse.x , this.mouse.y)


      let intersects = this.raycaster.intersectObjects(this.scene.children)
      console.log('******intersects******', intersects)

      for (let i = 0, len = intersects.length; i < len; i++) {
        console.log('**** NAME ****', intersects[i].object.name)
        // if (intersects[i].object.name.includes('传感器')) {
        //   // console.log(180, intersects[i].object)
        //   let color = Math.random() * 16 * 0xffffff
        //   intersects[i].object.material.color.set(color)
        // }
      }
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
    this.el = this.$refs.canvas
    this.init();
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.model3d {
  height: 600px;
  width: 900px;
  position: relative;
  &-canvas {
    width: 100%;
    height: 100%;
  }
}
.tag {
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  text-align: center;
  z-index: 100;
  display:block;
  //padding: 10px;
  background: red;
  line-height: 1;
  border-radius: 5px;
  border: 1px solid pink;
}

.box {
  //position: absolute;
  top: 0;
  width: 80px;
  height: 80px;
  text-align: center;
  z-index: 100;
  display:block;
  //padding: 10px;
  line-height: 1;
  border-radius: 5px;
  border: 1px solid pink;
}
</style>
