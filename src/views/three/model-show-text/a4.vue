<template>
  <div>
    ???????????????
    <div class="three-box_wrapper"></div>
    <div :id="`sign${idx + 1}`" style="position: absolute;" v-for="(v, idx) in labels" :key="idx">
      <div class="sign" :uuid="v.uuid">
        <div class="name">我是标签1</div>
        <div class="data">数据： {{v.uuid}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { webglOBJ, labelTag } from './webGL.js';
export default {
  name: 'threeBox',
  data () {
    return {
      labels: []
    };
  },
  mounted () {
    this.int();
  },
  methods: {
    createLabel () {

    },
    int () {
      const imgBG = require('./../../../assets/logo.png');
      const webGLdom = document.querySelector('.three-box_wrapper');
      const sence = webglOBJ.createSence(webGLdom);
      const camera = webglOBJ.createCamera();
      const renderer = webglOBJ.createRenderer();
      const plane = webglOBJ.createPlane(imgBG, imgBG);
      const boxGeometry = webglOBJ.createBoxGeometry(imgBG, { x: 10, y: 5, z: 10 });
      const boxGeometry1 = webglOBJ.createBoxGeometry(imgBG, { x: -10, y: 5, z: 10 });
      const spotLight = webglOBJ.createSpotLight();
      const directionalLight = webglOBJ.createDirectionalLight(boxGeometry);
      const ambient = webglOBJ.createAmbient();
      const datGui = webglOBJ.createDatGui();
      const controls = webglOBJ.createControls();
      const axisHelper = webglOBJ.createAxisHelper();
      // 将对象添加到场景中去
      webglOBJ.senceAdd([plane, boxGeometry, boxGeometry1, spotLight, directionalLight, ambient, datGui, controls, axisHelper]);
      // webglOBJ.webglRender(sence, camera, renderer);
      console.log(sence, 'sence');
      const vm = this;
      function render(html) {
        vm.labels = sence.children.filter(v => v.type == 'Mesh');
        vm.$nextTick(() => {
          sence.children.forEach((val, idx) => {
            if (val.type == 'Mesh') {
              const { x, y, z } = val.position;
              labelTag(camera, { x, y, z }, `sign${idx + 1}`, val, webGLdom);
            }
          });
        });

        renderer.render(sence, camera);
        requestAnimationFrame(render);
      };
      render();

      // 监听点击事件查看点击的元素
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      // 点击了哪个模型
      function clickEvent(event) {
        console.log('dianjidianji', event)
        if (event.target.tagName == 'CANVAS') {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          sence.updateMatrixWorld(true);
          // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
          raycaster.setFromCamera(mouse, camera);
          // 获取raycaster直线和所有模型相交的数组集合
          let intersects = raycaster.intersectObjects(sence.children, true);
          if (intersects[0]) {
            console.log(intersects[0]);
          }
        }
      }
      window.addEventListener('click', clickEvent, false);
    }
  }
};
</script>

<style lang="less" scoped>
.three-box_wrapper {
  position: relative;
  width: 100%;
  height: 800px;
  border: 1px solid #ccc;
}
div[id *= "sign"] {
  width: 250px;
  height: 100px;
  background: rgba(0, 0, 0, .65);
  .sign{
    div {
      color: #fff;
      text-align: left;
      padding: 0 5px;
    }
  }
}
</style>
