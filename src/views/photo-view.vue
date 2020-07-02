<template>
  <div>
    <Button @click="btnClick" type="primary">点击</Button>
    <a-photo-view v-if="photoViewShow" :srcs="srcArr" :curridx="n" @b-bpv-close="bpvClose" :title="title"></a-photo-view>
  </div>
</template>
<script>
import APhotoView from "@/components/a-photo-view";
export default {
  components: {
    APhotoView
  },
  data() {
    return {
      photoViewShow: false,
      n: -1,
      src: "",
      srcArr: [],
      srcStr: "",
      title: ""
    };
  },
  methods: {
    bpvClose () {
      this.photoViewShow = false;
    },
    btnClick () {
      // this.title = "巴拉巴拉小魔仙"
      this.srcArr = [
        "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
        "http://pic26.nipic.com/20121221/9252150_142515375000_2.jpg",
        "http://pic68.nipic.com/file/20150601/8164280_104301508000_2.jpg",
        "http://pic25.nipic.com/20121117/9252150_165726249000_2.jpg",
        "http://pic13.nipic.com/20110409/7119492_114440620000_2.jpg"
      ];
      this.srcStr = "http://pic60.nipic.com/file/20150129/6448355_204110337000_2.jpg";
      let n = this.n;
      if (this.srcArr && this.n > this.srcArr.length - 1) {
        this.n = 0;
      }
      this.n++;
      this.photoViewShow = true;
    }
  }
};
</script>
