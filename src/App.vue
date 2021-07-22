<template>
  <div id="app">
    <div id="nav">
      灵感来源有的来自网络、有的来自自己做过的项目。仅用于学习，不做商用。也请各位小伙伴共勉！
    </div>
    <router-view />

    <div class="call-wrapper">
      <div class="diggit"></div>
      <div class="clear"></div>
      <div class="diggword">我不负责赚钱养家哦~~</div>
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.call-wrapper {
  position: fixed;
  bottom: 50px;
  margin: 0px;
  right: 16px;
  animation: jumping 5s ease-in-out;
  animation-iteration-count: infinite;
  float: right;
  font-size: 12px;
  width: 125px;
  text-align: center;
  .diggit {
    background: url('~@/assets/ball.png') no-repeat;
    border-radius: 50%;
    box-shadow: 0px 0px 15px 5px #fff inset;
    cursor: pointer;
    height: 100px;
    margin: 0px;
    padding: 0px;
    width: 100px;
    text-align: center;
    &::before {
      content: "主人负责貌美如花";
      position: absolute;
      top: -40px;
      left: 7px;
      font-size: 14px;
      color: #5bf;
    }
  }
  .diggword {
    color: red;
    margin-top: 20px;
  }
  @keyframes jumping {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0px);
    }
  }
}
</style>
