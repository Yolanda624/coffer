<template>
  <div class="water-fall">
    <vue-waterfall-easy
      ref="waterfall"
      :imgsArr="imgsArr"
      :imgWidth="300"
      :maxCols="4"
      @scrollReachBottom="getData"
      @click="handleClickImg"
    >
      <div class="img-info" slot-scope="props">
        {{ props.value.info }}
      </div>

      <!-- <div slot="waterfall-head">waterfall-head</div> -->

      <div slot="waterfall-over">我是有底线的</div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
import axios from "axios";
export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      imgsArr: [],
      group: 0
    };
  },
  methods: {
    getData() {
      if (this.group === 4) {
        this.$refs.waterfall.waterfallOver();
        return;
      }
      axios.get(`./static/mock/data.json?group=${this.group}`).then(res => {
        this.imgsArr = this.imgsArr.concat(res.data);
        this.group++;
      });
    },
    handleClickImg(event, { index, value }) {
      event.preventDefault();
      if (event.target.tagName.toLowerCase() === "img") {
        console.log("点击的图片", value);
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.water-fall {
  height: 700px;
  .img-info {
    text-align: center;
    padding: 10px;
  }
}
</style>
