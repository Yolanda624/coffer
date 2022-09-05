<template>
  <!-- 曲线并带面积渐变阴影 -->
  <!-- 样子就像 渐变的曲线面积图 -->
  <div class="arc-area-shadow">
    <svg width="750" height="450">
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(6,81,191,0.18)" />
          <stop offset="80%" stop-color="rgba(255,0,0,0)" />
          <!-- <stop offset="50%" stop-color="rgba(8,68,158,0)"/> -->
          <stop offset="100%" stop-color="rgba(0,108,255,0.35)" />
        </linearGradient>

        <linearGradient id="linear1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#03ffea" />
          <stop offset="100%" stop-color="#0f8bf1" />
        </linearGradient>
      </defs>
      <polygon
        fill="url(#linear)"
        points="30,1  60,17 60,52 30,69 1,52 1,17"
        stroke="url(#linear1)"
        stroke-width="2"
      />
      <path :d="arcPath" stroke="url(#linear1)" fill="url(#linear)"></path>
    </svg>

    <svg width="564" height="573">
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(6,81,191,0.18)" />
          <stop offset="80%" stop-color="rgba(255,0,0,0)" />
          <!-- <stop offset="50%" stop-color="rgba(8,68,158,0)"/> -->
          <stop offset="100%" stop-color="rgba(0,108,255,0.35)" />
        </linearGradient>

        <linearGradient id="linear1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#03ffea" />
          <stop offset="100%" stop-color="#0f8bf1" />
        </linearGradient>
      </defs>
      <polygon
        fill="url(#linear)"
        points="30,1  60,17 60,52 30,69 1,52 1,17"
        stroke="url(#linear1)"
        stroke-width="2"
      />
      <path
        d="M0 600 Q100 50 600 600 Z"
        stroke="url(#linear1)"
        fill="url(#linear)"
      ></path>
    </svg>

    <svg width="150px" height="150px" class="svg">
      <circle
        r="70"
        cy="75"
        cx="75"
        stroke-width="8"
        stroke="#EAEFF4"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
      />
      <circle
        class="progress"
        r="70"
        cy="75"
        cx="75"
        stroke-width="8"
        stroke="#1593FF"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        stroke-dashoffset="0px"
        stroke-dasharray="470px"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [1, 2, 3, 4, 5, 60, 90, 8, 9, 10, 5, 3],
      h: 450,
      w: 750,
      y_data: [],
      x_data: [],
      XY_data: [],
      arcPath: ''
    }
  },
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
      var xAngle = Math.atan2((y2 - y1), (x2 - x1));
      // 转为角度
      xAngle = 360 * xAngle / (2 * PI);
      // 两点间的长度
      var L = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
      // 计算等腰三角形斜边长度
      var L2 = L / 2 / Math.cos(angle * 2 * PI / 360);

      // 求第一个顶点坐标，位于下边
      var val1 = {};
      // 求第二个顶点坐标，位于上边
      var val2 = {};
      val1['x'] = x1 + Math.round(L2 * Math.cos((xAngle + angle) * 2 * PI / 360));
      val1['y'] = y1 + Math.round(L2 * Math.sin((xAngle + angle) * 2 * PI / 360));
      val2['x'] = x1 + Math.round(L2 * Math.cos((xAngle - angle) * 2 * PI / 360));
      val2['y'] = y1 + Math.round(L2 * Math.sin((xAngle - angle) * 2 * PI / 360));

      return [val1, val2];
    },


    formatDataY(h, dis = 5) {
      let list = [];
      for (let i = 0; i < this.data.length; i++) {
        const e = this.data[i];
        list[i] = h - e * 50 / h * 3 - dis;
      }
      return list;
    },
    formatDataX(w, iW = 26) {
      let len = this.data.length;

      // 每列的间距，最左侧最右侧占比1.5
      let dis = Number(((w - iW * len) / (len - 1 + 1.5 * 2)).toFixed(2));
      let margin = Number((dis * 1.5).toFixed(2));

      let x1 = margin + iW / 2; // x1居中的坐标
      let x2 = margin + dis * 1 + iW + iW / 2;
      let x3 = margin + dis * 2 + iW * 2 + iW / 2;
      console.log(56565656, dis, margin);
      let x_list = [];
      for (let i = 0; i < len; i++) {
        x_list[i] = Math.round((margin + dis * i + iW * i + iW / 2).toFixed(2))
      }

      return x_list;
    },
    formatXY() {
      let len = this.data.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        arr[i] = {
          left: this.x_data[i],
          top: this.y_data[i]
        }
      }
      return arr;
    },

    computeControlVal() {
      let len = this.XY_data.length;
      let posList = [];
      for (let i = 0; i < len - 1; i++) {
        const curr = this.XY_data[i];
        const next = this.XY_data[i + 1];
        console.log(128128, curr, next);
        let val = this.getPosition(curr, next, 10);
        // if (next.top < curr.top) {
        //   // 上升的趋势
        //   posList[i] = val[1]
        // } else posList[i] = val[0];
        console.log(133133133, val);
        posList[i] = next.top < curr.top ? val[1] : val[0];
      }
      console.log(135, posList);
    }
  },
  created() {
    this.y_data = this.formatDataY(this.h);
    this.x_data = this.formatDataX(this.w, 26);
    this.XY_data = this.formatXY();
    let val = this.getPosition({ left: 60, top: 444 }, { left: 117, top: 443 }, 10)
    setTimeout(() => {
      this.computeControlVal();

    }, 0)
    this.XY_data.forEach((e, i) => {
      if (i == 0) this.arcPath = `M${this.h} ${e.top} L0 ${e.top}`;

      this.arcPath += ` L${e.left} ${e.top}`

      if (i == this.XY_data.length - 1) {
        this.arcPath += `L${e.left} ${this.h} Z`
      }
    });
  }
}
</script>

<style>
polygon,
path {
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

.arc-area-shadow {
  margin: 20px;
}
</style>
