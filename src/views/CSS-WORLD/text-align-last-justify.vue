<template>
  <div>
    <p><b>要点：</b>通过text-align-last:justify设置文本两端对齐</p>
    <p><b>场景：</b>未知字数中文对齐</p>
    <div class="main">
      <div v-for="(item,index) in list" :key="index" class="item">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list: ['账号','密码','常用地址','巴拉啦']
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  .item{
    margin-top: 5px;
		padding: 0 20px;
    width: 100px;
		height: 40px;
		background-color: darksalmon;
		line-height: 40px;
    color: #fff;
    
		text-align-last: justify;
  }
}
</style>
