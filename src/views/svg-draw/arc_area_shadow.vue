<template>
  <!-- 曲线并带面积渐变阴影 -->
  <!-- 样子就像 渐变的曲线面积图 -->
  <div>

  <svg width="564" height="573">
    <defs>
      <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(6,81,191,0.18)"/>
        <stop offset="80%" stop-color="rgba(255,0,0,0)"/>
        <!-- <stop offset="50%" stop-color="rgba(8,68,158,0)"/> -->
        <stop offset="100%"   stop-color="rgba(0,108,255,0.35)"/>
      </linearGradient>

      <linearGradient id="linear1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="#03ffea"/>
        <stop offset="100%" stop-color="#0f8bf1"/>
      </linearGradient>
    </defs>
    <polygon fill="url(#linear)" points="30,1  60,17 60,52 30,69 1,52 1,17" stroke="url(#linear1)" stroke-width="2" />
      <path d="M0 600 Q100 50 600 600 Z" stroke="url(#linear1)" fill="url(#linear)"></path>
  </svg>

  <svg width="150px" height="150px" class="svg">
    <circle r="70" cy="75" cx="75" stroke-width="8" stroke="#EAEFF4" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
    <circle class="progress" r="70" cy="75" cx="75" stroke-width="8" stroke="#1593FF" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-dashoffset="0px"  stroke-dasharray="470px" />
</svg>
  </div>
</template>

<script>
export default {

}
</script>

<style>
	polygon, path {
		animation: strokeDefaultPoly 3s linear infinite alternate;
	}
	@keyframes strokeDefaultPoly {
		0% {
			stroke-dasharray: 0 50;
		}
		100% {
			stroke-dasharray: 500;
		}
	}
</style>
