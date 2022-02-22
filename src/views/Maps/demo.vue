<template>
  <div class="demo">
    <div id="aMapContainer"></div>
  </div>
</template>



<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  data() {
    return {
      aMap: null
    }
  },
  methods: {
    initMap() {
      window._AMapSecurityConfig = {
          securityJsCode:'7a2df256efe662e7c05c09e7e82b07f1',
      }
      AMapLoader.load({
        key: "5ecc4dfbdf4fd558050ae61539acfcfd",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        // plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        // plugins:['AMap.ToolBar','AMap.Driving', 'AMap.Scale'],
      }).then((AMap) => {
        this.aMap = new AMap.Map("aMapContainer", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 5,           //初始化地图级别
          zooms: [3.75, 10],
          center: [120.380142, 36.071316], //初始化地图中心点位置 青岛

          // 查看全部参数 https://lbs.amap.com/api/jsapi-v2/documentation#map
          // 开发指南 https://lbs.amap.com/api/jsapi-v2/guide/map/lifecycle
          mapStyle: 'amap://styles/47a6eb2a1ae94005ee52093719e021ee'
        });
      }).catch(e => {
        console.log(e);
      })
    },
  },
  mounted() {
    this.initMap();
  },
  beforeDestroy() {
    this.aMap && this.aMap.destroy();
  }
}
</script>

<style  scoped>
#aMapContainer {
  padding: 0px;
  margin: 0px;
  width: 800px;
  height: 800px;
}
</style>
