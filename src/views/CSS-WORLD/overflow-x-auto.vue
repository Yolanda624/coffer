<template>
  <div>
    <p>
      <b>要点：</b>通过flexbox或inline-block的形式横向排列元素，对父元素设置overflow-x:auto横向滚动查看</p>
    <p>
      <b>场景：</b>横向滚动列表、元素过多但位置有限的导航栏</p>
    <div class="main">
      <div class="bruce flex-ct-y">
        <div class="horizontal-list flex">
          <ul>
            <li v-for="item in 9" :key="item">{{item}}a</li>
          </ul>
        </div>
        <div class="horizontal-list inline">
          <ul>
            <li v-for="item in 9" :key="item">{{item}}b</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main{
  margin: 20px;
}
.horizontal-list {
  overflow: hidden;
  width: 300px;
  height: 100px;
  ul {
    overflow-x: scroll;
    cursor: pointer;
    &::-webkit-scrollbar {
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #f0f0f0;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: red;
    }
  }
  li {
    overflow: hidden;
    margin-left: 10px;
    height: 90px;
    background-color: purple;
    line-height: 90px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    &:first-child {
      margin-left: 0;
    }
  }
}
.flex {
  ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  li {
    flex-shrink: 0;
    flex-basis: 90px;
  }
}

.inline {
  margin-top: 10px;
  height: 102px;
  ul {
    overflow-y: hidden;
    white-space: nowrap;
  }
  li {
    display: inline-block;
    width: 90px;
  }
}
</style>
