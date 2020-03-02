<template>
  <div>
    <h2>flex布局，子项flex-grow按比例分配空间</h2>
    <br>
    <h3>example1</h3>
    <h3>当所有的li都设置 flex-grow:0; 时则相当于没有设置，所有的li保持原状。</h3>
    <ul class="wrapper">
      <li class="item item-ex1" v-for="index in 5" :key="`flexaGrow${index}`">{{index}}</li>
    </ul>

    <br>
    <h3>example2</h3>
    <h3> 当flex-grow之和小于等于1时，按占总的比例
      <i>分配剩余</i> 的空间。</h3>
    <h4>本例中，第一个li设置为0.3，其余4个设置为0.15。</h4>
    <p>ul的width=500，每个li的width=30，则剩余500-30*5=350。第一个占0.3，也就是350*0.3+30=135。 其他的四个各占0.15，也就是350*0.15+30=82.5。
    </p>
    <ul class="wrapper">
      <li class="item item-ex2" v-for="index in 5" :key="`flexaGrow${index}`">{{index}}</li>
    </ul>

    <br>
    <h3>example3</h3>
    <h3> 当flex-grow之和大于1时，按占比
      <i>分配剩余</i> 的空间。</h3>
    <h4>本例中，第一个li设置为1，其余4个设置为0.15。</h4>
    <p>ul的width=500，每个li的width=30，则剩余500-30*5=350。第一个占1/(1+0.15*6)，也就是350*1/1.6+30=248.75。 其他的四个各占0.15，也就是350*0.15/1.6+30=62.8125。(在控制台检查时显示两位小数，62.81)
    </p>
    <ul class="wrapper">
      <li class="item item-ex3" v-for="index in 5" :key="`flexaGrow${index}`">{{index}}</li>
    </ul>

    <br>
    <h3>example4</h3>
    <h3> 当flex-grow都相同且之和小于1时，按占比
      <i>分配剩余</i> 的空间。</h3>
    <h4>本例中，flex-grow都是0.1</h4>
    <ul class="wrapper">
      <li class="item item-ex4" v-for="index in 5" :key="`flexaGrow${index}`">{{index}}</li>
    </ul>

    <br>
    <h3>example4</h3>
    <h3> 当flex-grow都相同且之和大于等于1时，相当于等分总空间</h3>
    <h4>本例中，flex-grow都是0.3或者0.2</h4>
    <ul class="wrapper">
      <li class="item item-ex5" v-for="index in 5" :key="`flexaGrow${index}`">{{index}}</li>
    </ul>

  </div>
</template>

<script>
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}
.wrapper {
  display: flex;
  width: 500px;
  height: 70px;
  background: palevioletred;
  .item {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: olivedrab;
    border: 1px solid;
    box-sizing: border-box;
  }
  .item.item-ex1 {
    flex-grow: 0;
  }
  .item.item-ex2 {
    flex-grow: 0.15;
    &:first-child {
      flex-grow: 0.3;
    }
  }

  .item.item-ex3 {
    flex-grow: 0.15;
    &:first-child {
      flex-grow: 1;
    }
  }

  .item.item-ex4 {
    flex-grow: 0.1;
  }

  .item.item-ex5 {
    flex-grow: 0.3;
  }
}
</style>
