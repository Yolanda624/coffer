<template>
  <div class="model-loader-demo">
    <div class="boxs">
      <div
        v-for="(item, i) in labels"
        class="box"
        :ref="`box${i}`"
        :key="`box_${i}`"
        @click="onClickBox(item, i)"
      >
        {{ item.name }}
      </div>
    </div>
    <!--      file-path="http://10.0.0.147:5501/fbx/Samba Dancing.fbx"-->
<!--    file-path="http://10.0.0.147:5501/gltf-models/a2.gltf"-->
    <!--    file-path="http://10.0.0.147:5501/dae-models/stormtrooper/stormtrooper.dae"-->

<!--    :scale="{x: 0.4, y: 0.4, z: 0.4}"-->

    <model-loader
      ref="model3d"
      file-path="http://10.0.0.147:5501/gltf-models/a2.gltf"
      :scale="scale"
      :cameraPosition="{x: 50, y: 200, z: 200}"
      @load="onLoad"
      @render="onRender"
      @click="onClick"
    >
      <template v-for="(item, index) in labels">
        <div class="tag" :ref="`tag${index}`" :data-name="item.name" :key="`tag_${index}`"></div>
      </template>
    </model-loader>
  </div>
</template>

<script>
import ModelLoader from '@/components/model-loader'
import LeaderLine from 'leader-line'

import * as THREE from "three";
export default {
  name: "model-loader-demo",
  components: {
    ModelLoader
  },
  props: {},

  data() {
    return {
      labels: [],
      scale: { x: 0.4, y: 0.4, z: 0.4 }
    };
  },

  computed: {},

  watch: {},

  methods: {
    onLoad(scene, camera) {
      console.log('onLoad', scene)
      let modelRef = this.$refs.model3d;
      let sensorList = modelRef.getMesh([
        { name: '传感器', type: 'Object3D' },
        { name: '传感器1', type: 'Object3D' },
        { name: '传感器2', type: 'Object3D' },
      ]);
      this.labels = sensorList;
      console.log('sensorList', sensorList)
    },

    onRender(scene, camera, controls) {
      let modelRef = this.$refs.model3d;
      this.labels.forEach((item, i) => {
        this.addLabelTag(camera, item.position, modelRef.$el, this.$refs['tag' + i][0])
        this.drawLeaderLine(this.$refs['box' + i][0], this.$refs['tag' + i][0], i)
      });
    },
    onClick(event, instersected) {
      console.log('onClick', instersected)

    },

    onClickBox(item, i) {
      console.log('onClickBox', item, i)
      // if(item.leaderLine) item.leaderLine.remove()
    },

    addLabelTag(camera, position, modelDOM, labelTarget) {
      if (!modelDOM || !labelTarget) return;
      let { width, height } = modelDOM.getBoundingClientRect();
      let worldVector = new THREE.Vector3(position.x, position.y, position.z);
      let vector = worldVector.project(camera);
      console.log('转换后', vector.x, vector.y, width, height);
      let halfWidth = width / 2;
      let halfHeight = height / 2;
      let scale_x = this.scale.x || 1;
      let scale_y = this.scale.y || 1;
      let x = Math.round(vector.x * scale_x * halfWidth + halfWidth);
      let y = Math.round(-vector.y * scale_y * halfHeight + halfHeight);
      labelTarget.style.left = x + 'px';
      labelTarget.style.top = y + 'px';
    },

    drawLeaderLine(startDOM, endDOM, labelIdx) {
      let labelItem = this.labels[labelIdx];
      if (!labelItem) return;
      if (labelItem.leaderLine) {
        labelItem.leaderLine.remove();
        labelItem['leaderLine'] = null;
      }
      labelItem.leaderLine = new LeaderLine(startDOM, endDOM, { hide: false });
    },

  },

  created() {
  },

  mounted() {
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.model-loader-demo {
  height: 800px;
  width: 800px;
  .tag {
    position: absolute;
    width: 10px;
    height: 10px;
    background: red;
  }
  .boxs {
    display: flex;
    .box {
      width: 100px;
      height: 100px;
      border: 1px solid #ffb7b7;
    }
  }
}
</style>
