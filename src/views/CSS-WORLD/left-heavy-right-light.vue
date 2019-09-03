<template>
  <div class="left-heavy-right-light">
    <div>
      <div class="explain">
        <p><b>场景：</b>右侧带图标的导航栏</p>
      </div>
      <hr>
        <p><b>要点(方法一)：</b>使用flexbox横向布局时，最后一个元素通过margin-left:auto实现向右对齐</p>
      <div class="main">
        <div class="nav-wrapper method1">
          <div v-for="item in 6" :key="item" class="item">按钮{{item}}</div>
        </div>
      </div>
    </div>

    <div>
      <div class="explain">
      </div>
        <p><b>要点（方法二）：</b>使用float:left，最后一个元素通过float:right实现向右对齐</p>

       <div class="main">
        <div class="nav-wrapper method2">
          <div v-for="item in 7" :key="item" class="item">2按钮{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.nav-wrapper{
  margin: 10px 0;
  padding: 0 10px;
  width: 600px;
  height: 60px;
  background: rgb(36, 172, 177);
  .item{
    background: rgb(201, 110, 57);
    padding: 0 10px;
    height: 40px;
    line-height:40px;
    text-align: center;
      & + .item {
        margin-left: 10px;
      }
  }
}


.nav-wrapper.method1{
  display: flex;
  align-items: center;
  .item{
      &:last-child {
        margin-left: auto;
      }
  }
}

.nav-wrapper.method2{
  .item{
    float: left;
    &:last-child{
      float: right;
    }
  }
}

</style>
