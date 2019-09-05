<template>
  <div>
    <p><b>要点：</b>表单控件触发focus和blur事件后往父元素进行冒泡，在父元素上通过:focus-within捕获该冒泡事件来设置样式 </p>
    <p><b>场景：</b>登录注册弹框、表单校验、
    <a href="https://codepen.io/dannievinther/pen/NvZjvz"> 离屏导航 </a>
    、
    <a href="https://codepen.io/Chokcoco/pen/RJEpaP">导航切换</a>
     </p>
    <p><b>兼容：</b>:focus-within、:placeholder-shown </p>
    <p><b>代码：</b><a href="https://www.cnblogs.com/coco1s/p/9406413.html">更多相关示例</a> </p>
    
    <div class="bruce flex-ct-x">
      <form class="bubble-distribution">
        <h3>注册</h3>
        <div class="accout">
          <input type="text" placeholder="请输入手机或邮箱" pattern="^1[3456789]\d{9}$|^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$" required>
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png">
        </div>
        <div class="password">
          <input type="password" placeholder="请输入密码(6到20位字符)" pattern="^[\dA-Za-z_]{6,20}$" required>
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png">
        </div>
        <div class="code">
          <input type="text" placeholder="请输入邀请码(6位数字)" pattern="^[\d]{6}$" maxLength="6" required>
          <button type="button">查询</button>
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png">
        </div>
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png">
        <ul>
          <li>
            <input type="radio" name="sex" id="male">
            <label for="male">Boy</label>
          </li>
          <li>
            <input type="radio" name="sex" id="female">
            <label for="female">Girl</label>
          </li>
        </ul>
        <button type="button">注册</button>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
@blue: #09f;
@red: rgb(250, 130, 130);
ul,
li {
  list-style: none;
}

.bruce {
  background-color: #999;

  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bubble-distribution {
  position: relative;
  margin-top: 50px;
  padding: 25px;
  border-radius: 2px;
  width: 320px;
  background-color: #fff;
  h3 {
    font-weight: bold;
    font-size: 16px;
    color: #333;
    text-align: center;
  }
  div {
    margin-top: 10px;
  }
  img {
    position: absolute;
    left: 50%;
    bottom: 100%;
    margin: 0 0 -20px -60px;
    width: 120px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
  }
  li {
    position: relative;
    width: 45%;
    transition: all 300ms;
    &:focus-within {
      background: linear-gradient(90deg, @blue 50%, transparent 0) repeat-x,
        linear-gradient(90deg, @blue 50%, transparent 0) repeat-x,
        linear-gradient(0deg, @blue 50%, transparent 0) repeat-y,
        linear-gradient(0deg, @blue 50%, transparent 0) repeat-y;
      background-position: 0 0, 0 100%, 0 0, 100% 0;
      background-size: 8px 1px, 8px 1px, 1px 8px, 1px 8px;
      animation: move 500ms infinite linear;
    }
  }
  input[type="text"],
  input[type="password"] {
    padding: 10px;
    outline: none;
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    width: 100%;
    height: 40px;
    transition: all 300ms;
    &:focus:valid {
      border-color: @blue;
    }
    &:focus:invalid {
      border-color: @red;
    }
  }
  input[type="radio"] {
    position: absolute;
    width: 0;
    height: 0;
    &:checked + label {
      border: 3px solid transparent;
      background-color: @blue;
      color: #fff;
    }
  }
  label {
    display: block;
    border-bottom: 1px solid #ccc;
    width: 100%;
    background-clip: padding-box;
    cursor: pointer;
    text-align: center;
    transition: all 300ms;
  }
  button {
    overflow: hidden;
    margin-top: 10px;
    outline: none;
    border: none;
    border-radius: 2px;
    width: 100%;
    height: 40px;
    background-color: @blue;
    cursor: pointer;
    color: #fff;
    transition: all 300ms;
  }
}
.accout,
.password,
.code {
  img {
    display: none;
    margin-bottom: -27px;
  }
  &:focus-within {
    img {
      display: block;
    }
    & ~ img {
      display: none;
    }
  }
}
.code {
  display: flex;
  justify-content: space-between;
  button {
    margin-top: 0;
  }
  input {
    &:not(:placeholder-shown) {
      width: 70%;
      & + button {
        width: 25%;
      }
    }
    &:placeholder-shown {
      width: 100%;
      & + button {
        width: 0;
        opacity: 0;
      }
    }
  }
}
@keyframes move {
  to {
    background-position: 6% 0, -6% 100%, 0 -6%, 100% 6%;
  }
}
</style>
