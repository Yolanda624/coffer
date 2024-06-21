<template>
  <div class="leader-line">
    <h3>LeaderLine：Draw a leader line in your web page.</h3>
    <div class="content">
      <div ref="start" class="line-dot start">start</div>
      <div ref="end" class="line-dot end">end</div>
      <div ref="end2" class="line-dot end2">end2</div>
    </div>
  </div>
</template>

<script>
import LeaderLine from "leader-line";

export default {
  data() {
    return {
      lines: []
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      let start = this.$refs.start;
      let end = this.$refs.end;
      let end2 = this.$refs.end2;
      this.lines.push(new LeaderLine(start, end, {
        color: '#f00',
        size: 1,
        path: "grid",
        // endSocket: "bottom",
        // endPlug: "behind",
        dash: true,
      }))

      this.lines.push(new LeaderLine(start, end2, {
        color: '#f0f',
        size: 1,
        path: "grid",
        // endSocket: "bottom",
        // endPlug: "behind",
        dash: true,
      }))
    })
  }
}
</script>

<style lang="less" scoped>
  .leader-line {
    .content {
      position: relative;
      .line-dot {
        position: absolute;
        width: 100px;
        height: 100px;
        padding: 4px 8px;
        border: 1px solid pink;
      }
      .start {
        top: 50px;
        left: 60px;
      }
      .end {
        top: 300px;
        right: 40px;
      }
      .end2 {
        top: 300px;
        right: 240px;
      }
    }
  }
</style>
