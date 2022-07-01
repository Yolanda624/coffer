<template>
  <div>
    <!-- <p>二维码</p>
    <a-qrcode></a-qrcode> -->
    <p>艺术二维码</p>
    <a-art-qrcode></a-art-qrcode>
  </div>
</template>
<script>
import AQrcode from "@/components/a-qrcode";
import aArtQrcode from "@/components/a-art-qrcode/index.vue";
export default {
  components: {
    AQrcode,
    aArtQrcode
  }
}
</script>
