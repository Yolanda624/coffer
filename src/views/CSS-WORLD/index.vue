<template>
  <div class="css-world">
    <div class="left">
       <b> 兼容性查询地址：<a href="https://caniuse.com/">https://caniuse.com/</a> </b>
       <br>
       <hr>
      <router-link v-for="(item,index) in list" :key="`route${index}`" :to="{name:item.name}" active-class = "router_active">
        <span>{{index + 1}}、{{item.title}}</span>
        <br> </router-link>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          title: '（1）flexbox+magin-left、（2）float实现左重右轻的列表排版',
          name: 'left-heavy-right-light'
        },
        {
          title: '文字竖向排版',
          name: 'writing-mode-vertical'
        },
        {
          title: '使用text-align-last对齐两端文本',
          name: 'text-align-last-justify'
        },
        {
          title: '使用:not()去除无用属性',
          name: 'not'
        },
        {
          title: '横向滚动列表',
          name: 'overflow-x-auto'
        },
        {
          title: '<input>搭配valid+invalid完成校验样式',
          name: 'valid-invalid'
        },
        {
          title: '使用attr()抓取data-*实现tooltip效果',
          name: 'attr-data'
        },
        {
          title: '使用+或~美化选项框',
          name: 'beauty-checked'
        },
        {
          title: '纯CSS实现掘金登录/注册页面',
          name: 'juejin-login-css'
        },
        {
          title: 'flex布局巧妙设计',
          name: 'flex-margin'
        },
        {
          title: 'flex-grow布局设计',
          name: 'flex-grow'
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.css-world{
  font-size: 14px;
  a{
    font-weight: 700;
  }
  .left,.right{
    width: 50%;
    border: 2px solid #ccc;
  }
}
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .router_active {
    color: red;
    font-weight: bold;
  }
</style>
