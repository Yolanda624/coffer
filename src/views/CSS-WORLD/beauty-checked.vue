<template>
  <div>
    <p><b>要点：</b>&lt;label&gt;使用+或~配合for绑定radio或checkbox的选择行为</p>
    <p><b>场景：</b>选项框美化、选中项增加选中样式</p>
    <p><b>兼容：</b>+、~、background-clip</p>
    <div class="bruce flex-ct-x">
      <ul class="beauty-selection">
        <li>
          <input type="radio" name="radioName" id="fed-engineer" hidden>
          <label for="fed-engineer"></label>
          <span>前端工程师</span>
        </li>
        <li>
          <input type="radio" name="radioName" id="bed-engineer" hidden>
          <label for="bed-engineer"></label>
          <span>后端工程师</span>
        </li>
        <li>
          <input type="radio" name="radioName" id="fsd-engineer" hidden>
          <label for="fsd-engineer"></label>
          <span>全栈工程师</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.beauty-selection {
  display: flex;
  li {
    display: flex;
    align-items: center;
    margin-left: 20px;
    &:first-child {
      margin-left: 0;
    }
  }
  input:checked + label {
    background-color: orange;
  }
  label {
    margin-right: 5px;
    padding: 2px;
    border: 1px solid orange;
    border-radius: 100%;
    width: 18px;
    height: 18px;
    background-clip: content-box;
    cursor: pointer;
    transition: all 300ms;
    &:hover {
      border-color: blue;
      background-color: blue;
      box-shadow: 0 0 7px blue;
    }
  }
  span {
    font-size: 16px;
  }
}
</style>
