<template>
  <div>
    <p>实际开发中经常会遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组URL，然后按照读取的顺序输出结果。</p>
    <p>只有相关的源码</p>
    <button @click="handleTest">开始</button>
  </div>
</template>

<script>
export default {
  methods: {
    // Promise 写法
    // 这个方法确实被简化，但是所有远程操作都是继发，只有前一个URL返回结果后才会去读取下一个Url,效率低。
    logInOrder1(url) {
      // 远程读取所有的URL
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });
      // 按次序输出
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise).then(text => console.log(text)); 
      }, Promise.resolve());
    },

    // async函数
    // 这个方法的代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。
    // 后面的for..of 循环内部使用了await，因此实现了按顺序输出
    async logInOrder2(urls) {
      textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // 按次序输出
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    },

    // 测试第2中方法
    async handleTest() {
      let arr = ['a', 'b', 'c']
      let tests = arr.map( async item => {
        const res = await this.handleItem(item);
        return JSON.stringify(res);
      });

      for (const test of tests) {
        console.log(await test);
      }
      
    },
    handleItem(item) {
      console.time('handleItem执行时间');
      console.timeEnd('handleItem执行时间');
      return "handleItem===" + item;
    }
  }
}
</script>
