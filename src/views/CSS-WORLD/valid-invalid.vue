<template>
  <div>
    <p><b> 要点：</b></p> &lt;input&gt;使用伪类:valid和:invalid配合pattern校验表单输入的内容
    <p><b> 场景：</b></p>表单校验
    <p><b> 兼容：</b></p>pattern、:valid、:invalid
    <div class="bruce flex-ct-x">
      <form class="form-validation">
        <div>
          <label>名字</label>
          <input type="text" placeholder="请输入你的名字(1到10个中文)" pattern="^[\u4e00-\u9fa5]{1,10}$" required>
        </div>
        <div>
          <label>手机</label>
          <input type="text" placeholder="请输入你的手机" pattern="^1[3456789]\d{9}$" required>
        </div>
        <div>
          <label>简介</label>
          <textarea required></textarea>
        </div>
      </form>
    </div>
  </div>
</template>


<style lang="less" scoped>
.form-validation {
  width: 500px;
  div {
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  }
  label {
    display: block;
    padding-bottom: 5px;
    font-weight: bold;
    font-size: 16px;
  }
  input,
  textarea {
    display: block;
    padding: 0 20px;
    outline: none;
    border: 1px solid #ccc;
    width: 100%;
    height: 40px;
    caret-color: blue;
    transition: all 300ms;
    &:valid {
      border-color: green;
      box-shadow: inset 5px 0 0 green;
    }
    &:invalid {
      border-color: red;
      box-shadow: inset 5px 0 0 red;
    }
  }
  textarea {
    height: 122px;
    resize: none;
    line-height: 30px;
    font-size: 16px;
  }
}
</style>

