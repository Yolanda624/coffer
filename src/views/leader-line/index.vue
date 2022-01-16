<!--
 * @Author: your name
 * @Date: 2021-03-25 16:59:03
 * @LastEditTime: 2021-03-25 17:35:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coffer\src\views\leader-line\index.vue
-->
<template>
  <div class="leader-line">
    <h3>LeaderLine：Draw a leader line in your web page.</h3>
    <div class="content">
      <div ref="start" class="line-dot start">start</div>
      <div ref="end" class="line-dot end">end</div>
    </div>
  </div>
</template>

<script>

export default {
  created() {
  },
  mounted() {
    let start = this.$refs.start;
    let end = this.$refs.end;
  }
}
</script>

<style lang="less" scoped>
  .leader-line {
    .content {
      .line-dot {
        padding: 4px 8px;
        border: 1px solid pink;
      }
    }
  }
</style>
