<template>
  <div class="a-art-qrcode" id="artQrcode">
    <canvas width="1000" height="1000" style="display: none;"></canvas>
    <canvas :width="400" :height="400" class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import logo from "@/assets/qrcode.jpg";
import QRcode from '@/components/a-art-qrcode/artqrcode';
export default {
  props: {
    url: {
      // required: true,
      type: String,
      default: 'http://www.baidu.com'
    },
    btmText: {
      // required: false,
      type: String,
      default: '这是底部居中文字'
    },
    centerImg: {
      required: false,
      type: String,
      default: logo
    }
  },
  data() {
    return {
      qrUrl: '',
      src: ''
    }
  },
  methods: {
    async onQrcodeToDataUrl() {

     var qrcode = new QRcode(document.getElementById("artQrcode"), {
        text: "http://www.baidu.com",
        /**
         * width,height 是输出图的宽高
         * codeWidth,codeHeight 是二维码的宽高
         * top,left 是二维码区域的定位
         */
				width: 400,
				height: 400,
				codeWidth: 250,
				codeHeight: 250,
				top: 70,
				left: 75,
        /**
         * 素材配置
         */
        materials: {
            border: require("@/assets/border.png"),
            eye: require('@/assets/eye2.png'),
            // row4: "./materials/electron/row4.png",
            // col4: "./materials/electron/col3.png",
            // row2col3: "./materials/electron/row2col3.png",
            // row3col2: "./materials/electron/row3col2.png",
            // col3: ["./materials/electron/col3.png", "./materials/electron/col3_2.png"],
            // row2col2: "./materials/electron/row2col2.png",
            // corner: "./materials/electron/corner.png",
            // row2: ["./materials/electron/row2.png", "./materials/electron/row2_2.png"],
            // col2: "./materials/electron/col2.png",
            // single: ["./materials/electron/single.png", "./materials/electron/single_2.png"],
        }
    });
                let img1 = document.createElement('img');
            img1.src = qrcode.getImgUrl();
            document.body.appendChild(img1)

    let canvas = this.$refs.canvas;
    let box = document.getElementById('artQrcode');
    let img = box.getElementsByTagName('img')[0]
    console.log('imgimg', img)
    // img.src = art_url;
    let ctx = canvas.getContext('2d');
    // setTimeout(function() {
      img.onload = ()=> {
      ctx.drawImage(img, 0, 0, 400, 400);
      }

    //   //设置字体
    //   ctx.font = "bold " + 14 + "px Arial";
    //   ctx.textBaseline = "top"; //设置绘制文本时的文本基线。
    //   ctx.fillStyle = "#333";
    //   ctx.fillText('阿打算放', 10, 10);

    // }, 0);

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onQrcodeToDataUrl()
    })
  }
}
</script>

<style>

</style>
