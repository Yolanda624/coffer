<template>
  <div>
    现成的threeJS 模型加载组件

    <h3> 结论： 用vue-3d-loader做标识不是很方便</h3>

    <div class="wrapper">
      <div class="boxes">
        <div class="box">这是盒子</div>
      </div>

      <div class="content">
        <div class="sign" ref="sign1">这是标识</div>
        <vue-3d-loader
          class="model3d"
          ref="model3d"
          :filePath="['http://10.0.0.147:5500/a10.gltf']"
          :mtlPath="[null]"
          :cameraPosition="{x: 0, y: 0, z: 0}"
          :labels="labels"
          outputEncoding="sRGBEncoding"
          intersectRecursive
          @click="onClick"
          @load="onLoad"
          :enableMousemove="true"
          @mousemove="onMouseMove"
        />
      </div>


    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  data() {
    return {
      labels: [
        {
          text: "I'm Text Label",
          position: { x: 15, y: 0, z: 0 },
          scale: { x: 15, y: 8, z: 0 },
          textStyle: {
            fontFamily: "Arial",
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            color: "#ff0000",
            borderWidth: 8,
            borderRadius: 0,
            borderColor: "#000000",
            backgroundColor: "rgba(0,0,0,1)",
          },
          sid: 3, // 自定义标识，可有可无
        },
      ],
    }
  },
  methods: {
    addLabelTag(camera, position, webglDOM) {
      if (!webglDOM) return;
      let { width, height } = webglDOM.getBoundingClientRect();
      let worldVector = new THREE.Vector3(position.x, position.y, position.z);
      let vector = worldVector.project(camera)
      let halfWidth = width / 2;
      let halfHeight = height / 2;
      console.log('转换后', vector.x, vector.y, width, height)
      let x = Math.round(vector.x * halfWidth + halfWidth)
      let y = Math.round(-vector.y * halfHeight + halfHeight)

      let targetDOM = this.$refs.sign1;
      targetDOM.style.left = x + 'px';
      targetDOM.style.top = y + 'px';
    },

    onClick(event, intersects) {
      console.log(event, intersects)
    },
    onMouseMove(event, intersected) {
      console.log('event,intersected', event, intersected);
    },
    onLoad() {
      console.log('onLoad',)
      let ref = this.$refs.model3d
      console.log(68688, ref)
      ref.object.traverse(ch => {
        // console.log('child', child.name)
        if (ch.isObject3D && ch.name == '传感器1_1') {
          console.log(7676, ch)
          this.addLabelTag(ref.camera, ch.position, ref.$el)
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  .boxes {
    .box {
      width: 100px;
      height: 100px;
      border: 1px solid pink;
    }
  }

  .content {
    position: relative;
    width: 900px;
    height: 500px;
    .model3d {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }

  .sign {
    position: absolute;
    z-index: 1;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: red;
  }
}
</style>
