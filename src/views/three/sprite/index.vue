<template>
  <div class="sprite-index">
    <h3>THREE精灵模型 和 粒子系统</h3>
    <h5>精灵模型对象和网格模型一样需要设置材质，不过精灵模型不需要设置几何体，Threejs系统渲染的时候会自动设置。</h5>
    <h5>Three.js的精灵模型对象Sprite和Threejs的网格模型Mesh一样都是模型对象，基类都是Object3D</h5>
    <h5>建精灵模型对象Sprite和创建网格模型对象一样需要创建一个材质对象，不同的地方在于创建精灵模型对象不需要创建几何体对象Geometry，精灵模型对象本质上你可以理解为已经内部封装了一个平面矩形几何体PlaneGeometry，矩形精灵模型与矩形网格模型的区别在于精灵模型的矩形平面会始终平行于Canvas画布。</h5>
    <p>通过Sprite创建精灵模型不需要几何体，只需要给构造函数Sprite的参数设置为一个精灵材质SpriteMaterial即可。</p>
    <p>精灵材质对象SpriteMaterial和普通的网格材质一样可以设置颜色.color、颜色贴图.map、开启透明.transparent、透明度.opacity等属性，精灵材质对象SpriteMaterial的基类是材质Material。</p>

    <router-link to="/three/sprite/sprite1">sprint1</router-link>
    <router-link to="/three/sprite/sprite-tree">sprint-tree</router-link>
    <router-link to="/three/sprite/sprite-rain">sprint-rain</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  methods: {},

  created() {
  },

  mounted() {
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.sprite-index {
}
</style>
