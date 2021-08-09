<template>
  <div class="conver-canvas">
    <h3>需要在DOM中提供一个canvas</h3>
    <canvas ref="converCanvasRef"></canvas>
  </div>
</template>

<script>
import { convertImgToCanvas } from '@/libs/conver_canvas';
export default {
  data() {
    return {
      baseImg: require('@/assets/erweima_pdg.png'),
      centerImg: require('@/assets/ball.png'),
    }
  },
  methods: {
    init() {
      let canvasDOM = this.$refs.converCanvasRef;
      convertImgToCanvas({
        imgBase64: this.baseImg,
        canvasDom: canvasDOM,
        text: '这是文字',
        logoImg: this.centerImg
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }
}
</script>

<style>

</style>
