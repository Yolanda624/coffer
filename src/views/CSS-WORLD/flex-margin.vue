<template>
  <div>
    <h2>flex+margin:auto巧妙布局</h2>
    <h3>ul设置display:flex;子项li某项设置margin某个方向为auto</h3>
    <hr>
    <p>example 1</p>
    <p>第一个 li 设置 margin-right:auto</p>
    <ul class="wrapper ex-1">
      <li class="item item-ex-1" v-for="index in 5" :key="`flex1${index}`">{{index}}</li>
    </ul>

    <hr>
    <p>example 2</p>
    <p>最后一个 li 设置 margin-left:auto</p>
    <ul class="wrapper ex-2">
      <li class="item item-ex-2" v-for="index in 5" :key="`flex2${index}`">{{index}}</li>
    </ul>

    <hr>
    <p>example 3</p>
    <p>第二个 li 设置 margin:0 auto;</p>
    <ul class="wrapper ex-3">
      <li class="item item-ex-3" v-for="index in 5" :key="`flex3${index}`">{{index}}</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
ul,li {
  list-style: none;
}
.wrapper {
  display: flex;
  width: 500px;
  height: 70px;
  background: pink;
  .item {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: yellowgreen;
    border: 1px solid;
  }
  .item.item-ex-1:first-child {
    margin-right: auto;
  }

  .item.item-ex-2:last-child {
    margin-left: auto;
  }

  .item.item-ex-3:nth-child(2) {
    margin:0 auto;
  }
}
</style>
