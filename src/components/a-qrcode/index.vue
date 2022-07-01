<template>
  <div id="meQrcode" :title="qrUrl">
    <div class="qrcode_box">
      <img class="qrcode_canvas" id="qrcode_canvas" ref="qrcode_canvas" alt="二维码本图" />
      <canvas :width="qrSize" :height="qrSize" class="canvas" ref="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
import logo from "@/assets/qrcode.jpg";
export default {
  name: "AQrcode",
  props: {
    bQrUrl: {
      type: String,
      default: "http://www.baidu.com/"
    },
    qrSize: {
      type: Number,
      default: 300
    },
    qrText: {
      default: "百度一下，也不知道"
    },
    qrLogo: {
      default: logo
    },
    qrLogoSize: {
      type: Number,
      default: 60
    },
    qrTextSize: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      qrUrl: ""
    };
  },
  methods: {
    /**
     * @argument qrUrl        二维码内容
     * @argument qrSize       二维码大小
     * @argument qrText       二维码下方显示文字
     * @argument qrTextSize   二维码下方显示文字大小(默认16px)
     * @argument qrLogo       二维码中间显示图片
     * @argument qrLogoSize   二维码中间显示图片大小(默认为80)
     */
    handleQrcodeToDataUrl() {
      let qrcode_canvas = this.$refs.qrcode_canvas;
      let canvas = this.$refs.canvas;
      const that = this;
      QRCode.toDataURL(
        that.qrUrl,
        { errorCorrectionLevel: "H" },
        (err, url) => {
          qrcode_canvas.src = url;
          let ctx = canvas.getContext("2d");

          setTimeout(() => {
            console.log(6464646464, qrcode_canvas)
            ctx.drawImage(qrcode_canvas, 0, 0, that.qrSize, that.qrSize);
            if (that.qrLogo) {
              let qrcode_logo = new Image();
              qrcode_logo.src = that.qrLogo;
              //设置logo大小
              //设置获取的logo将其变为圆角以及添加白色背景
              ctx.fillStyle = "#fff";
              // ctx.strokeStyle = "#f00"; // 中间logo描边颜色为 #f00
              ctx.beginPath();
              let logoPosition = (that.qrSize - that.qrLogoSize) / 2; //logo相对于canvas居中定位
              let h = that.qrLogoSize + 6; //圆角高 10为基数(logo四周白色背景为10/2)
              let w = that.qrLogoSize + 6; //圆角宽
              let x = logoPosition - 3;
              let y = logoPosition - 3;
              let r = 5; //圆角半径
              ctx.moveTo(x + r, y);
              ctx.arcTo(x + w, y, x + w, y + h, r);
              ctx.arcTo(x + w, y + h, x, y + h, r);
              ctx.arcTo(x, y + h, x, y, r);
              ctx.arcTo(x, y, x + w, y, r);
              ctx.closePath();
              // ctx.stroke(); // 中间logo描边
              ctx.fill();

              qrcode_logo.onload = () => {
                ctx.drawImage(
                  qrcode_logo,
                  logoPosition,
                  logoPosition,
                  that.qrLogoSize,
                  that.qrLogoSize
                );
              };
            }
            if (that.qrText) {
              //设置字体
              let fpadd = 10; //规定内间距
              ctx.font = "bold " + that.qrTextSize + "px Arial";
              let tw = ctx.measureText(that.qrText).width; //文字真实宽度
              let ftop = that.qrSize - that.qrTextSize; //根据字体大小计算文字top
              let fleft = (that.qrSize - tw) / 2; //根据字体大小计算文字left
              let tp = that.qrTextSize / 2; //字体边距为字体大小的一半可以自己设置
              ctx.fillStyle = "#fff";
              ctx.fillRect(
                fleft - tp / 2,
                ftop - tp / 2,
                tw + tp,
                that.qrTextSize + tp
              );
              ctx.textBaseline = "top"; //设置绘制文本时的文本基线。
              ctx.fillStyle = "#333";
              ctx.fillText(that.qrText, fleft, ftop);
            }
            qrcode_canvas.src = canvas.toDataURL();
          }, 0);
        }
      );
    }
  },
  watch: {
    bQrUrl(nv) {
      this.qrUrl = nv;
    }
  },
  created() {
    this.qrUrl = this.bQrUrl;
  },
  mounted() {
    this.handleQrcodeToDataUrl();
  },
  updated() {
    this.handleQrcodeToDataUrl();
  }
};
</script>
<style scoped>
.qrcode_box,
#meQrcode {
  display: inline-block;
}

.qrcode_box img {
  display: none;
}
</style>
