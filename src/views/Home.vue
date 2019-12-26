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
        },
        {
          title: "froala富文本编辑器",
          route: "/froala"
        },
        {
          title: "ES6",
          route: "/es6"
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

