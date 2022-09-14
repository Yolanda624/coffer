<template>
  <div>
<!--      <h3>鼠标移动该模块的时候展示该模块的标签。或者可以常显，射线就是当鼠标移动到该模块该模块变化颜色</h3>-->
<!--    <div class="model3d" ref="model3d" id="model3d"></div>-->
<!--    <div class="box box1">这是文字标签1</div>-->
<!--    <div class="box box2">这是文字标签2</div>-->
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
      control: null,
      clock: null,
      mixer: null
    };
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      // this.viewBox = {
      //   width: this.$refs.model3d.clientWidth,
      //   height: this.$refs.model3d.clientHeight,
      //   offsetLeft: this.$refs.model3d.offsetLeft,
      //   offsetTop: this.$refs.model3d.offsetTop,
      // }

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
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);

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
      this.control = new OrbitControls(this.camera, this.renderer.domElement);

      const axesHelper = new THREE.AxesHelper(540);
      this.scene.add(axesHelper);

      this.initCssRender()
      let label = this.createTag()
      // label.position.set(0, 1, 0)
      console.log('**********', label)
      this.scene.add(label)


      this.onLoader();
      this.animate();

      window.addEventListener('click', this.onMouseClick, false)

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
      this.renderer.render(this.scene, this.camera);
    },

    onMouseClick(event) {
      console.log('event', event.clientX, event.clientY, )
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1 到 1
      // this.mouse.x = ((event.clientX - this.viewBox.offsetLeft) / this.viewBox.width) * 2 - 1
      // this.mouse.y = -((event.clientY - this.viewBox.offsetTop) / this.viewBox.height) * 2 + 1
      this.mouse.x = ((event.clientX - 0) / window.innerWidth) * 2 - 1
      this.mouse.y = -((event.clientY - 0) / window.innerHeight) * 2 + 1

      // console.log('点击', this.mouse)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      let intersects = this.raycaster.intersectObjects(this.scene.children)
      console.log('******intersects******', intersects)
      // for (let i = 0, len = intersects.length; i < len; i++) {
      //   console.log('**** NAME ****', intersects[i].object)
      //   if (intersects[i].object.name.includes('wheels')) {
      //     // console.log(180, intersects[i].object)
      //     let color = Math.random() * 16 * 0xffffff
      //     intersects[i].object.material.color.set(color)
      //   }
      // }

      // intersects.length > 0 说明选中了模型
      if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xef92bd)
      }


    },

    // 坐标转换
    // 这个方法好像不是很正确
    tran2dPos() {
      let cameraPosition = this.camera.position;
      let vectSphere = new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z)
      let posiSphere = vectSphere.project(this.camera)
      console.log('降维后的坐标时：', posiSphere)
    },

    createTag() {
      // let div = document.createElement('div')
      // // div.style.visibility = 'hidden'
      // div.innerHTML = '这是文字' + 0;
      // div.style.padding = '4px 10px'
      // div.style.color = '#fff';
      // div.style.fontSize = '16px';
      // div.style.position = 'absolute';
      // div.style.backgroundColor = 'rgba(255,25,25,0.5)';
      // div.style.borderRadius = '5px';
      // // 该上面设置的发小都是屏幕坐标大小
      // // div元素包装为CSS2模型对象CSS2DObject
      // let label = new CSS2DObject(div);
      // div.style.pointerEvents = 'none'; // 避免HTML标签遮挡三维场景的鼠标事件
      // // 设置HTML元素标签在three.js世界坐标中位置
      // // label.position.set(x, y, z);

      const div = document.createElement("div");
      div.className = "red-box-label";
      div.textContent = "红色正方体";
      const earthLabel = new CSS2DObject(div);
      earthLabel.position.set(0, 0.5, 0);

      return earthLabel; // 返回CSS2模型标签
    },

    initCssRender() {
      // 创建一个CSS2渲染器CSS2DRenderer
      let labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      // // 避免renderer.domElement影响HTMl标签定位，设置top为0px
      labelRenderer.domElement.style.top = '0px';
      labelRenderer.domElement.style.left = '0px';
      // //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
      labelRenderer.domElement.style.pointerEvents = 'none';
      document.body.appendChild(labelRenderer.domElement);
      return labelRenderer
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
  width: 100vw;
  height: 100vh;
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
