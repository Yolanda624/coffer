<template>
  <div>
    <ul class="list">
      <li>
        <a href="#1" rel="external nofollow">星期1</a>
      </li>
      <li>
        <a href="#2" rel="external nofollow">星期2</a>
      </li>
      <li>
        <a href="#3" rel="external nofollow">星期3</a>
      </li>
      <li>
        <a href="#4" rel="external nofollow">星期4</a>
      </li>
      <li>
        <a href="#5" rel="external nofollow">星期5</a>
      </li>
      <li>
        <a href="#6" rel="external nofollow">星期6</a>
      </li>
      <li>
        <a href="#7" rel="external nofollow">星期7</a>
      </li>
    </ul>
    <div class="main_con" id="1">11111111111111111111111111111111</div>
    <div class="main_con" id="2">22222222222222222222222222222222222</div>
    <div class="main_con" id="3">33333333333333333333333333333333333333</div>
    <div class="main_con" id="4">444444444444444444444444444444444444444</div>
    <div class="main_con" id="5">555555555555555555555555555555555555555</div>
    <div class="main_con" id="6">666666666666666666666666666666666666666</div>
    <div class="main_con" id="7">7777777777777777777777777777777777777777</div>
    <div style="height:800px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  }
}
</script>
<style>
.list {
  width: 100%;
  height: 50px;
}
li {
  width: 11%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #ccc;
  color: #ff6c00;
  float: left;
  list-style: none !important;
}
.main_con {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  line-height: 200px;
  text-align: center;
  color: blue;
}
</style>