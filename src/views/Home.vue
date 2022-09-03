<template>
  <div class="home">
    <router-link v-for="(item,index) in list" :key="`route${index}`" :to="item.route">{{index + 1}}、{{item.title}} <br> </router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
    return{
      list: [
        {
          title: "基于QRcode的带有文字+图片的二维码Vue组件",
          route: "/qrcode"
        },
        {
          title: '将二维码图片附上文字和中间logo并转成二维码canvas',
          route: 'convert-canvas'
        },
        {
          title: "图片查看器",
          route: "/photo-view"
        },
        {
          title: "分割面板",
          route: "/split-panel"
        },
        {
          title: "CSS相关技巧知识点",
          route: "/css-world"
        },{
          title: 'svg绘制曲线面积图',
          route: '/arc-area-shadow'
        },
        {
          title: "froala富文本编辑器",
          route: "/froala"
        },
        {
          title: "ES6",
          route: "/es6"
        },
        {
          title: "瀑布流",
          route: "/water-fall"
        },
        {
          title: "锚点(router中scrollBehavior处理)",
          route: "/anchor"
        },
        {
          title: "标线 LeaderLine 组件的用法",
          route: "/leader-line"
        },
      ]
    }
  }
}
</script>
<style lang="less">
.home{
  padding: 30px;
  a{
    font-weight: bold;
    font-size: 16px;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

