<template>
  <div class="html-to-pdf" id="pdfCentent">
      dgdsgsdfgggggggggggggggggggggggg
      <button @click="onClick">这是按钮</button>
  </div>
</template>

<script>
import { exportSavePdf } from './tools';
export default {
  methods: {
    onClick() {
  var element = document.getElementById('pdfCentent')

      exportSavePdf('pan123', element)
    }
  }
}
</script>

<style>

</style>
