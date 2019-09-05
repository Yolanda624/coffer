<template>
  <div>
    <p><b>要点：</b>在标签上自定义属性data-*，通过attr()获取其内容赋值到content上</p>
    <p><b>场景：</b>提示框</p>
    <p><b>兼容：</b>data-*、attr()</p>
    <span class="btn" data-tip="这是提示语">按钮</span>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .btn{
    display: inline-block;
    position: relative;
    margin-top: 10px;
    padding: 0 20px;
    border-radius: 10px;
    height: 40px;
    line-height: 40px;
    background-color: aqua;
    color: #fff;
    &::after{
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 120px;
      height: 100%;
      border-radius: 5px;
      background-color: rgba(#000,.5);
      opacity: 0;
      text-align: center;
      content: attr(data-tip);
      transition: all 300ms;
    }
    &:hover::after{
      opacity: 1;
      left: calc(100% + 20px);
    }
  }
</style>
