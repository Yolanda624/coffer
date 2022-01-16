<template>
  <div class="css-arc">
    <h2>css 实现弧线</h2>
    <a href="https://zhuanlan.zhihu.com/p/28142155?from_voters_page=true"></a>
    <div class="sub-1">
      <h3>一、border-radius</h3>
      <div class="header">
        <div class="bg-w">
          <div class="bg"></div>
        </div>
        <div class="cont">This is page header.</div>
      </div>
    </div>

    <div class="sub-2">
      <h3>二、scaleY</h3>
      <div class="header">
        <div class="bg-w">
          <div class="bg"></div>
        </div>
        <div class="cont">This is page header.</div>
      </div>
    </div>

    <div class="sub-3">
      <h3>三、SVG绘制</h3>
      <div>
        <svg width="200" height="50">
          <path
            d="M0 30 Q100 50 200 30"
            stroke="#7491ff"
            fill="none"
            style="stroke-width: 1px"
          ></path>
        </svg>
      </div>
      <div>
        <svg width="30" height="6">
          <path
            d="M3 1 Q15 6 27 1"
            stroke="#7491ff"
            fill="none"
            style="stroke-width: 2px;stroke-linecap:round;"
          ></path>
        </svg>
      </div>
      <div>
        <svg width="200" height="50">
          <path class="line" d="M0 30 L200 30" stroke="#7491ff" style="stroke-dasharray: 5;"></path>
        </svg>
      </div>
      <div>
        <svg>
          <defs>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#990000" stop-opacity="0" />
              <stop offset="1" stop-color="#990000" stop-opacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M10 30 Q100 50 200 30"
            fill="none"
            style="stroke-width:10px;stroke-linecap:round;stroke: url(#line-gradient)"
          ></path>
        </svg>
      </div>

      <div>
        <svg width="600" height="400">
          <path d="" stroke="#7491ff" style="stroke-dasharray: 5;"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // <path d="M30 90 Q115 139 200 90"></path>
    // M30 90 ：表示开始点 x:30 y:90
    // Q115 139 ：表示控制点在 x:115 y:139
    // 200 90 ：表示结束点 x:200 y:90
    // dot1 起点
    // dot2 终点
    // angle 角度
    // return 控制点
    getPosition(dot1, dot2, angle) {
      var x1 = dot1.left;
      var y1 = dot1.top;
      var x2 = dot2.left;
      var y2 = dot2.top;
      var PI = Math.PI;

      // 两点间的x轴夹角弧度
      var xAngle=Math.atan2((y2-y1), (x2-x1));
      // 转为角度
      xAngle = 360*xAngle/(2*PI);
      // 两点间的长度
      var L=Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
      // 计算等腰三角形斜边长度
      var L2 = L/2 / Math.cos(angle* 2*PI/360);

      // 求第一个顶点坐标，位于下边
      var val1={};
      // 求第二个顶点坐标，位于上边
      var val2={};
      val1['x']=x1+Math.round(L2 * Math.cos((xAngle+angle)* 2*PI/360));
      val1['y']=y1+Math.round(L2 * Math.sin((xAngle+angle)* 2*PI/360));
      val2['x']=x1+Math.round(L2 * Math.cos((xAngle-angle)* 2*PI/360));
      val2['y']=y1+Math.round(L2 * Math.sin((xAngle-angle)* 2*PI/360));

      return [val1,val2];
    }
  },
  created() {
    const pos = this.getPosition ({left: 30, top: 90}, {left: 200, top: 90}, 30);
    console.log(pos); // [{"x":115,"y":139},{"x":115,"y":41}]
  }
}
</script>

<style lang="less" scoped>
.css-arc {
  height: 90vh;
  padding: 20px;
}
.sub-1,
.sub-2 {
  .header {
    position: relative;
    margin: 0 auto;
    /*max-width: 990px;*/
  }
  .bg-w {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
  }
  .bg-w .bg {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 900%;
    height: 3000px;
    border-radius: 50%;
    border: 1px solid #7491ff;
    background-color: #7491ff;
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1114%2F0G320103935%2F200G3103935-1-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642317430&t=56e5a62…);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .header .cont {
    position: relative;
    z-index: 2;
    padding: 20px 0;
    text-align: center;
    color: #fff;
  }
}
.sub-2 {
  .bg-w .bg {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 150%;
    height: 3000px;
    border-radius: 0 0 50% 50%;
    border: 1px solid #7491ff;
    background-color: #7491ff;
    transform: translate(-50%, 0) scaleY(0.04);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
  }
}
</style>
