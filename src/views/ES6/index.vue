<template>
  <div class="css-world">
    <div class="left">
       <br>
       <hr>
      <router-link v-for="(item,index) in list" :key="`route${index}`" :to="{name:item.name}">{{index + 1}}、{{item.title}} <br> </router-link>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {
          title: 'asnyc-await 异步变同步处理动画 P387',
          name: 'async-await'
        },
        {
          title: 'asnyc-await-for 按顺序完成异步操作 P389',
          name: 'async-await-for'
        },
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.css-world{
  font-size: 14px;
  a{
    font-weight: 700;
  }
  .left,.right{
    width: 50%;
    border: 2px solid #ccc;
  }
}
  .left{
    float: left;
  }
  .right{
    float: right;
  }
</style>
