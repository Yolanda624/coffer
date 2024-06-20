<template>
  <div id="g6Container"></div>
</template>

<script>
import { drawFun } from "./draw";

export default {
  name: "index",
  components: {},
  props: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  methods: {
    init() {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/fc6e64fc-be94-40fb-b9e2-2d13dd414f38.json')
        .then((res) => res.json())
        .then((data) => {
          drawFun('g6Container', data)});
    }
  },

  created() {
  },

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
#g6Container {
  width: 100vw;
  height: 90vh;
  //background-color: pink;
}
</style>
