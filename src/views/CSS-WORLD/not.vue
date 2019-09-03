<template>
  <div>
    <p><b>要点：</b>通过:not()排除指定元素不使用设置样式</p>
    <p><b>场景：</b>符号分割文字、边界元素排版(首元素、尾元素、左右两边元素)</p>
    <div class="main">
        <ul class="first">
          <span v-for="item in 5" :key="item">
            {{item}}
          </span>
        </ul>

        <li class="second">
          <span v-for="item in 9" :key="item+1">
            {{item}}
          </span>
        </li>
    </div>
  </div>
</template>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}
.main {
  li {
    height: 40px;
    line-height: 40px;
  }
}
span {
  color: purple;
  font-size: 16px;
  font-weight: bold;
}
.first span:not(:last-child)::after {
  // 除了最后一个span（不包括最后一个span）
  content: "--";
}

.second span:not(:nth-child(-n + 4)){
  // 除了前四个（不包括前四个）
  display: none;
}
</style>
