<template>
  <div class="flame">
    <h3>特别感谢：https://juejin.cn/post/6986967746453962782</h3>
    <h3>实现这个火焰效果需要 filter: contrast() 与 filter: blur() 配合</h3>
    <section>
      <div class="container">
        <div class="fire">
          <div v-for="i in 40" :key="i" class="dot"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$dotCount: 40;
$animationTime: 2;
$delayTime: 3;

@function randomNum($max, $min: 0) {
  @return ($min + random($max));
}

.flame {
  overflow: hidden;
  section {
    background: #000;
    width: 500px;
    height: 500px;
  }
}
:root {
  --fireWidth: 115px;
  --fireHeight: 200px;
  --dotSize: 24px;
  --fireColor: #b5932f;
  // --fireColor: #008eff;
  // --fireColor: #ff9900;
}
.container {
  display: flex;
  --fireWidth: 115px;
  --fireHeight: 200px;
  --dotSize: 24px;
  --fireColor: #008eff;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #000;
}
.fire {
  margin: auto;
  --fireWidth: 115px;
  --fireHeight: 200px;
  --dotSize: 24px;
  --fireColor: #008eff;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  position: absolute;
  width: 0;
  height: 0;
  bottom: 100px;
  left: 50%;
  border-radius: 45%;
  box-sizing: border-box;
  border: 200px solid #000;
  border-bottom: 200px solid transparent;
  transform: translate(-50%, 0) scaleX(0.4);
  background-color: var(--fireColor);
  filter: blur(20px) contrast(30);
  .dot {
    position: absolute;
    bottom: -210px;
    left: 0;
    width: var(--dotSize);
    height: var(--dotSize);
    background: #000;
    border-radius: 50%;
  }
}

@for $i from 1 to $dotCount + 1 {
  .dot:nth-child(#{$i}) {
    bottom: -#{randomNum(120, 240)}px;
    left: #{randomNum(300, -160)}px;
    animation: move
      #{randomNum($animationTime * 13, 7) /
      10}s
      infinite
      #{randomNum($delayTime * 20) /
      10}s
      linear;
  }
}

@keyframes move {
  100% {
    transform: translate3d(0, -350px, 0);
  }
}
</style>
