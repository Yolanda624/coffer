<template>
  <div>
    <p><b>要点：</b>通过writing-mode调整文本排版方向</p>
    <p><b>场景：</b>竖行文字、文言文、诗词</p>
    <div class="main">
      <h3>越人歌</h3>
      <p>今夕何夕兮，搴舟中流。</p>
      <p>今日何日兮，得与王子同舟。</p>
      <p>蒙羞被好兮，不訾诟耻。</p>
      <p>心几烦而不绝兮，得知王子。</p>
      <p>山有木兮木有枝，心悦君兮君不知。</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .main{
    writing-mode: vertical-rl;
  }
</style>


