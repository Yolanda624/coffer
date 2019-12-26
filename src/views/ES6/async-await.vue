<template>
  <div>
    <p>前情：假定某个DOM元素上面，部署了一系列的动画，前一个动画结束，才能开始下一个。如果当中有一个动画出错，就不要继续执行，而返回上一个成功的动画的返回值。</p>
    <button @click="handleStart">正常不出错-》开始</button> </br>
    <button @click="handleStart2">中间有一个出错了-》开始</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      animations: []
    };
  },
  methods: {
    handleStart () {
      // 假设一个animations 函数数组
      let anims = [].concat(this.animations);
      this.chainAnimationsPromise('假装是动画的DOM', anims);
    },

    handleStart2 () {
      let anims = [].concat(this.animations);
      let ran = Math.floor(Math.random() * 10);
      console.log('要出错的是：', ran);
      anims[ran] = function () {
        throw new Error(`第${ran}个动画出错了！`);
      };
      this.chainAnimationsPromise('会有一个出错的', anims);
    },

    async chainAnimationsPromise (elem, animations) {
      // 变量ret用来保存上一个动画的返回值
      try {
        var ret = null;
        for (let anim of animations) {
          ret = await anim(elem);
          console.log('ret', ret);
        }
      } catch (e) {
        // 忽略错误，继续执行
        console.log('catch中的error', e);
      }
      return ret;
    }
  },

  created () {
    // 造一个虚假数据
    let animations = [];
    for (let i = 0; i < 10; i++) {
      animations.push(function (anim) {
        // console.log(anim + i);
        return anim + i;
      });
    }
    this.animations = animations;
  }
};
</script>
