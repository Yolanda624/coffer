<template>
  <div>
    <a-split-panel></a-split-panel>

    <!-- .wrapper 演示的是分割面板的基本实现原理 -->
    <div class="wrapper">
      <div class="pane pane-left"></div>
      <div class="pane pane-right">
        来源：iivew。特别感谢iview的作者。
      </div>
    </div>

  </div>
</template>
<script>
import ASplitPanel from '@/components/a-split-panel';
export default {
  components: {
    ASplitPanel
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  position: relative;
  width: 500px;
  height: 500px;
  margin-left: 20px;
  .pane{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    &-left{
      background: rgb(233, 158, 18);
      // right: 40%; // 方法一
      width: 60%; // 方法二
    }
    &-right{
      background: rgb(13, 231, 220);
      // left: 60%; // 方法一
      left: 60%; // 方法二
    }
  }
}
</style>


