<template>
  <div class="bc-bpv-container" id="bc-bpv-container">
    <div class="header">
      <div class="header-item title-container">
        <div>
          <Icon type="md-images" :size="imgIconSize" /> {{currTitle}}
        </div>
      </div>
      <div class="header-item btns-container">
        <span class="btn btn-close" @click="close">
          <Icon type="md-close" :size="closeBtnSize" />
        </span>
      </div>
    </div>
    <div class="body">
      <div class="body-layer" :style="{'bottom':isShowNav?'175px':'40px'}">
        <div ref="imgMain" class="main" @mousemove.stop.prevent="handleMousemove">
          <div class="arrow-container arrow-container-left" v-if="idx>0">
            <div class="arrow arrow-left" @click="arrowBack">
              <Icon type="ios-arrow-back" :size="arrowSize" />
            </div>
          </div>
          <div class="arrow-container arrow-container-right" v-if="idx<normalSrcs.length-1">
            <div class="arrow arrow-right" @click="arrowForward">
              <Icon type="ios-arrow-forward" :size="arrowSize" />
            </div>
          </div>

          <div class="img-alt-text" v-if="altTextShow">
            <p>由于图片过大或过多，导致加载异常。解决方案如下：</p>
            <p>1、关闭重试。</p>
            <p>2、利用底部缩略导航图尝试打开其他图片。</p>
            <p>3、利用左（右）方向键尝试打开其他图片。</p>
          </div>

          <div v-if="!altTextShow" ref="imgWrapper" class="img-wrapper" @mousewheel.stop.prevent="zoomWheel">
            <img ref="img" alt="图片" :src="currSrc" id="img" @mousedown.stop.prevent="handleImgMousedown" 
              :style="{'cursor':dragable?'grab':'default','transform':`rotate(${rotateDeg}deg)`}">
          </div>

          <transition name="fade">
            <div class="toolbar" id="toolbar" v-if="isShowtoolbar" :style="{'bottom':isShowNav?'210px':'90px'}">
              <ButtonGroup size="large">
                <Button ghost @click="zoomIn">
                  <Icon type="md-remove-circle" :size="toolbarSize" />
                </Button>
                <Button ghost @click="zoomOut">
                  <Icon type="md-add-circle" :size="toolbarSize" />
                </Button>
                <Button ghost @click="rotateAnticlock">
                  <Icon type="md-refresh" :size="toolbarSize" style="transform:rotateY(180deg)" />
                </Button>
                <Button ghost @click="rotateClock">
                  <Icon type="md-refresh" :size="toolbarSize" />
                </Button>
                <Button ghost @click="oneToOne">
                  1:1
                </Button>
                <Button ghost @click="adaptPage">
                  <Icon type="md-expand" :size="toolbarSize" />
                </Button>
              </ButtonGroup>
            </div>
          </transition>
          <transition name="fade">
            <div class="zoom-tag" v-if="isShowZoomtag">{{zoomPercent}}%</div>
          </transition>
        </div>
      </div>
      <div class="footer">
        <div class="footer-info" @click="displayBottomNav">
          <span class="footer-info-title">
            {{ isShowNav ? '隐藏' : '显示' }}所有文件
            <Icon type="ios-arrow-down" v-if="!isShowNav" />
            <Icon type="ios-arrow-up" v-if="isShowNav" />
          </span>
        </div>
        <div class="footer-sink" v-if="isShowNav">
          <ul class="footer-sink-modes">
            <li class="footer-sink-modes-item" v-for="(item,index) in normalSrcs" :key="`imgnav${index}`" @click="()=>{idx=index;}">
              <div class="img-box" :style="{ 'borderColor': index == idx ? '#3572B0' : '#333' }">
                <img :src="item" alt="缩略图">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { on, off } from "@/libs/tools";
export default {
  props: {
    srcs: {
      required: true,
      type: [Array, String]
    },
    curridx: {
      default: 0
    },
    title: ""
  },
  data() {
    return {
      imgIconSize: 30,
      closeBtnSize: 22,
      toolbarSize: 16,
      arrowSize: 46,
      rotateDeg: 0,
      idx: 0,
      isShowNav: false,
      isShowtoolbar: false,
      isShowZoomtag: false,
      imgWidth: "",
      imgFactWidth: null,
      zoomPercent: 0,
      altTextShow: false,
      oCient: {},
      oMargin: {},
      mainPos: {}, // mainDOM左上角相对于body的位置
      mainPos2: {}, // mainDOM右下角相对于body的位置 暂时没有用到0812
      dragable: false,
      isEvenRotate: false
    }
  },
  methods: {
    arrowBack() {
      if (this.idx <= 0) return;
      this.idx--;
      this.init();
    },
    arrowForward() {
      if (this.idx >= this.normalSrcs.length - 1) return;
      this.idx++;
      this.init();
    },
    zoomIn() {
      this.zoomPercent = this.zoomPercent - 20;
      this.adjustWidth();
    },
    zoomOut() {
      this.zoomPercent = this.zoomPercent + 20;
      this.adjustWidth();
    },
    zoomWheel(event) {
      const evt = evt || window.event;
      let wheelDelta = evt.wheelDelta / 120;
      this.zoomPercent = this.zoomPercent + wheelDelta * 5;
      this.adjustWidth();
    },
    rotateAnticlock() {
      let deg = this.rotateDeg;
      this.rotateDeg = (deg - 90) % 360;
      this.rotateInit();
    },
    rotateClock() {
      let deg = this.rotateDeg;
      this.rotateDeg = (deg + 90) % 360;
      this.rotateInit();
    },
    oneToOne() {
      let img = this.$refs.img;
      img.removeAttribute("style");
      this.zoomPercent = 100;
      this.adjustWidth();
    },
    adaptPage() {
      let img = this.$refs.img;
      img.removeAttribute("style");
      let mainDOM = this.$refs.imgMain;
      let imgSize = {
        w: img.width,
        h: img.height,
        w_to_h: img.width / img.height
      };

      let mainSize = {
        w: mainDOM.clientWidth - 4,
        h: mainDOM.clientHeight - 4,
        w_to_h: mainDOM.clientWidth / mainDOM.clientHeight
      };

      if (this.isEvenRotate) {
        if (imgSize.w >= mainSize.h) {
          this.zoomPercent = parseInt(mainSize.h / this.imgFactWidth * 100);
        } else if (imgSize.h >= mainSize.w) {
          this.zoomPercent = parseInt(mainSize.w * imgSize.w_to_h / this.imgFactWidth * 100);
        }
      } else {
        if (imgSize.w_to_h >= mainSize.w_to_h) {
          this.zoomPercent = parseInt((mainSize.w) / this.imgFactWidth * 100);
        } else {
          this.zoomPercent = parseInt(imgSize.w_to_h * mainSize.h / this.imgFactWidth * 100);
        }
      }
      this.adjustWidth();
    },
    adjustWidth() {
      let img = this.$refs.img;
      // img.removeAttribute('style');
      img.removeAttribute('width');

      img.style.cursor = this.dragable ? "grab" : "default";
      img.style.transform = `rotate(${this.rotateDeg}deg)`;

      let w = this.zoomPercent / 100 * this.imgFactWidth;
      this.imgWidth = w;
      img.width = w;
      this.isShowZoomtag = true;
    },
    init() {
      const that = this;
      let img = this.$refs.img;
      img.removeAttribute('width');
      img.removeAttribute('style');
      let mainDOM = this.$refs.imgMain;
      let imgSize = {
        w: img.width,
        h: img.height,
        w_to_h: img.width / img.height
      };
      let mainSize = {
        w: mainDOM.clientWidth - 4,
        h: mainDOM.clientHeight - 4,
        w_to_h: mainDOM.clientWidth / mainDOM.clientHeight
      };
      let imgFactWidth = imgSize.w;
      that.imgFactWidth = imgFactWidth;
      if (imgSize.w_to_h >= mainSize.w_to_h && imgSize.w >= mainSize.w) {
        img.width = mainSize.w;
      } else if (imgSize.w_to_h < mainSize.w_to_h && imgSize.h >= mainSize.h) {
        img.width = imgSize.w_to_h * mainSize.h;
      }
      that.imgWidth = img.width;
      that.zoomPercent = parseInt(img.width / imgFactWidth * 100);
      that.isShowZoomtag = true;
    },

    // 旋转后的init
    rotateInit() {
      let currDeg = this.rotateDeg;
      let isEven = (currDeg / 90) % 2 == 1 ? true : false;
      this.isEvenRotate = isEven;

      let img = this.$refs.img;
      img.removeAttribute("style");
      let mainDOM = this.$refs.imgMain;

      let mainSize = {
        w: mainDOM.clientWidth - 4,
        h: mainDOM.clientHeight - 4,
        w_to_h: mainDOM.clientWidth / mainDOM.clientHeight
      };

      let oImg = {
        w: img.width,
        h: img.height,
        w_to_h: img.width / img.height
      };

      if (isEven) {
        // 让图片的宽度去适应main的高度，让图片的高度去使用main的宽度
        if (oImg.w >= mainSize.h) {
          img.width = mainSize.h;
        } else if (oImg.h >= mainSize.w) {
          img.width = oImg.w_to_h * mainSize.w;
        }
        this.zoomPercent = parseInt(img.width / this.imgFactWidth * 100);
        this.isShowZoomtag = true;
      } else {
        this.init();
        this.zoomPercent = parseInt(img.width / this.imgFactWidth * 100);
        this.isShowZoomtag = true;
      }
    },

    close() {
      this.$emit('b-bpv-close')
    },
    displayBottomNav() {
      this.isShowNav = !this.isShowNav;
    },
    handleMousemove() {
      let isShowtoolbar = this.isShowtoolbar;
      if (!isShowtoolbar) {
        this.isShowtoolbar = true;
      }
    },

    /**
       拖动图片操作 --start
     */
    // 获取DOM元素相对于body的位置
    getOffsetPosByBody(el) {
      let offsetTop = 0, offsetLeft = 0;
      while (el && el.tagName !== 'BODY') {
        offsetTop += el.offsetTop,
          offsetLeft += el.offsetLeft,
          el = el.offsetParent
      }
      return {
        top: offsetTop,
        left: offsetLeft
      }
    },

    handleImgMousemove(e) {
      if (!this.dragable) return false;
      let img = e.target;
      let mainDOM = this.$refs.imgMain;
      let nClient = {
        x: e.clientX,
        y: e.clientY
      };
      let imgPos = this.getOffsetPosByBody(img);
      let imgOffset = {
        w: img.width,
        h: img.height
      }
      let mainPos = this.mainPos;
      let mainPos2 = this.mainPos2;
      let imgPos2 = {
        left: imgOffset.w + imgPos.left,
        top: imgOffset.h + imgPos.top
      }

      let mainSize = {
        w: mainDOM.clientWidth - 4,
        h: mainDOM.clientHeight - 4,
        w_to_h: mainDOM.clientWidth / mainDOM.clientHeight
      };

      // 鼠标移动的距离
      let dis = {
        x: nClient.x - this.oClient.x,
        y: nClient.y - this.oClient.y
      };

      // if (imgPos.left >= mainPos.left) {
      //   console.log('imgPos.left = mainPos.left', dis)
      // }

      // if (imgPos.left >= mainPos.left && dis.x > 0 || imgPos2.left <= mainPos2.left && dis.x < 0) return;
      // if (imgPos.top >= mainPos.top && dis.y > 0 || imgPos2.top <= mainPos2.top && dis.y < 0) return;

      // if (imgOffset.w > mainSize.w) {
      img.style.marginLeft = this.oMargin.left + dis.x + 'px';
      // }
      // if (imgOffset.h > mainSize.h) {
      img.style.marginTop = this.oMargin.top + dis.y + 'px';
      // }
    },
    handleImgMousedown(e) {
      if (!this.dragable) return false;
      let img = e.target;
      let mainDOM = this.$refs.imgMain;
      img.style.cursor = 'grabbing';
      let oClient = {
        x: e.clientX,
        y: e.clientY
      };
      let left = img.style.marginLeft || "0px";
      let top = img.style.marginTop || "0px";
      let oMargin = {
        left: Number(left.substring(0, left.length - 2)),
        top: Number(top.substring(0, top.length - 2))
      };
      let mainPos = this.getOffsetPosByBody(mainDOM);
      this.oClient = oClient;
      this.oMargin = oMargin;
      this.mainPos = mainPos;
      let mainOffset = {
        w: mainDOM.offsetWidth,
        h: mainDOM.offsetHeight
      }
      let mainPos2 = {
        left: mainOffset.w + mainPos.left,
        top: mainOffset.h + mainPos.top
      }
      this.mainPos2 = mainPos2;
      on(img, "mousemove", this.handleImgMousemove);
      on(window, "mouseup", this.handleImgMouseup);
    },

    handleImgMouseup(e) {
      let tar = e.target;
      let img = this.$refs.img;
      img.style.cursor = this.dragable ? 'grab' : 'default';
      off(img, "mousemove", this.handleImgMousemove);
      off(window, "mouseup", this.handleImgMouseup);
    },

    isDragable() {
      let flag = false;
      let img = this.$refs.img;
      let mainDOM = this.$refs.imgMain;
      let imgSize = {
        w: img.width,
        h: img.height,
        w_to_h: img.width / img.height
      };
      let mainSize = {
        w: mainDOM.clientWidth - 4,
        h: mainDOM.clientHeight - 4,
        w_to_h: mainDOM.clientWidth / mainDOM.clientHeight
      };

      if (this.isEvenRotate) {
        if (imgSize.w > mainSize.h) flag = true;
        else if (imgSize.h > mainSize.w) flag = true;
        else flag = false;
      } else {
        if (imgSize.w_to_h >= mainSize.w_to_h && imgSize.w > mainSize.w) flag = true;
        else if (imgSize.w_to_h < mainSize.w_to_h && imgSize.h > mainSize.h) flag = true;
        else flag = false;
      }
      this.dragable = flag;
      return flag;
    }
    /**
      -- end
     * 
     */
  },
  computed: {
    currSrc() {
      return this.normalSrcs[this.idx];
    },
    currTitle() {
      if (!this.title) {
        return this.normalSrcs[this.idx];
      } else {
        return this.title;
      }
    },
    normalSrcs() {
      let srcs = this.srcs;
      if (typeof (srcs) === 'string') return srcs.split(",");
      if (srcs instanceof Array) return srcs;
    },
  },
  watch: {
    curridx(v, o) {
      this.idx = v || 0;
      if (this.normalSrcs.length <= 1) {
        this.idx = 0;
      }
    },
    isShowtoolbar(v) {
      const that = this;
      if (v) {
        setTimeout(function () {
          that.isShowtoolbar = false;
        }, 3000);
      }
    },
    isShowZoomtag(v) {
      const that = this;
      if (v) {
        setTimeout(function () {
          that.isShowZoomtag = false;
        }, 3000);
      }
    },
    zoomPercent(v) {
      if (!v || isNaN(v)) {
        this.altTextShow = true;
      } else {
        this.altTextShow = false;
      }
      this.isDragable();
    },
  },
  mounted() {
    const that = this;
    that.idx = that.curridx;
    this.$nextTick(() => {
      let img = this.$refs.img;
      img.onload = function () {
        that.init();
      }
    })
  },
  beforeDestroy() {
    off(window, "mouseup", this.handleImgMouseup);
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
img {
  vertical-align: top;
  border: none;
}
// 本组件滚动条的设置
&::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*滚动条滑块*/
&::-webkit-scrollbar-thumb {
  border-radius: 8px;
  box-shadow: inset 0 0 5px #fff;
  -webkit-box-shadow: inset 0 0 5px #fff;
  background: #535353;
}
/*滚动条轨道*/
&::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 8px;
  background: #ccc;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0.5;
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}

.bc-bpv-container {
  background: rgba(51, 51, 51, 0.95);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;

  .header {
    height: 50px;
    display: table;
    box-sizing: border-box;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    background-color: #000000;
    padding-left: 10px;
    color: #fff;
    font-size: 16px;

    .header-item {
      box-sizing: border-box;
      display: table-cell;
      margin: 0;
      vertical-align: top;
      line-height: 50px;
    }

    .title-container {
      max-width: 95%;
      display: block;
      float: left;
    }

    .btns-container {
      max-width: 30%;
      display: block;
      float: right;
      cursor: pointer;

      .btn {
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
      }
    }
  }

  .body {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    border-spacing: 0;
    table-layout: fixed;
    &-layer {
      bottom: 40px;
      box-sizing: border-box;
      left: 0;
      position: absolute;
      right: 0;
      text-align: center;
      top: 50px;
      vertical-align: middle;
      .main {
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        z-index: 998;
        text-align: center;

        .arrow-container {
          position: absolute;
          width: 100px;
          height: 100%;
          cursor: pointer;
          z-index: 999;
          &-left {
            left: 0;
          }
          &-right {
            right: 0;
          }
          &:hover {
            .arrow {
              display: block;
            }
          }
          .arrow {
            display: none;
            width: 50px;
            height: 100px;
            position: absolute;
            top: 50%;
            margin-top: -50px;
            color: #ccc;
            line-height: 100px;
            background: #747272;
            &-left {
              left: 0;
              border-radius: 0px 10px 10px 0;
            }
            &-right {
              right: 0;
              border-radius: 10px 0 0 10px;
            }
          }
        }
        .img-alt-text {
          display: inline-block;
          margin: auto;
          text-align: left;
          font-size: 16px;
          color: #ccc;
        }
        .toolbar {
          position: fixed;
          left: 50%;
          bottom: 90px;
          background-color: #333;
          border-radius: 5px;
          margin-left: -138px;
          color: rgba(0, 0, 0, 0.5);
        }
        .zoom-tag {
          display: inline-block;
          position: fixed;
          left: 50%;
          top: 50%;
          width: 50px;
          height: 20px;
          line-height: 20px;
          background-color: rgba(0, 0, 0, 0.8);
          border-radius: 10px;
          color: #fff;
          font-size: 12px;
          margin-left: -25px;
          margin-top: -10px;
          text-align: center;
        }
      }
    }
  }

  .footer {
    background-color: #000;
    position: absolute;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;

    &-info {
      color: #fff;
      display: inline-block;
      width: 100%;
      font-size: 0.85em;
      height: 40px;
      line-height: 40px;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      &-title {
        display: block;
        padding-left: 20px;
        color: #fff;
        text-decoration: none;
      }
    }
    &-sink {
      background-color: #333;
      height: 130px;
      margin-top: 0;
      padding-bottom: 20px;
      padding-left: 0;
      overflow-y: auto;
      overflow-x: hidden;
      &-modes {
        width: 100%;
        height: 100%;
        &-item {
          color: #fff;
          display: inline-block;
          text-align: center;
          padding-left: 10px;
          max-width: 145px;
          .img-box {
            display: inline-block;
            box-sizing: content-box;
            background-color: #444;
            border: 2px solid #333;
            margin: 10px auto 0 auto;
            padding: 10px 20px;
            img {
              height: 60px;
            }
          }
        }
      }
    }
  }
}
</style>
