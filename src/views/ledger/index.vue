<template>
  <div class="ledger">
    <div
      v-for="(node, i) in relatedData.nodes"
      :key="'node_' + i"
      :ref="'node'+node.id"
      class="ledger-node"
      :class="'node-'+node.id"
      :style="{left: node.x + 'px', top: node.y + 'px'}"
    >
      <div class="node-label">{{node.label}}</div>
      <div
        v-for="(sub, i) in node.children"
        :key="'sub_' + i"
        :ref="'sub_'+sub.id"
        class="sub-node"
      >
        {{ sub.label }}
      </div>
    </div>
  </div>
</template>

<script>
import LeaderLine from "leader-line";

export default {
  name: "LedgerIndex",
  components: {},
  props: {},

  data() {
    return {
      relatedData: {
        nodes: [
          {
            id: '1',
            label: '做功调节',
            x: 406,
            y: 0,
            children: [
              {
                id: '11',
                label: '变频器'
              }
            ]
          },
          {
            id: '2',
            label: '动力系统',
            x: 0,
            y: 0,
            children: [
              {
                id: '21',
                label: '电机'
              }
            ]
          },
          {
            id: '3',
            label: '传动系统',
            x: 0,
            y: 278,
            children: [
              {
                id: '31',
                label: '减速机'
              },
              {
                id: '32',
                label: '蛇形联轴器'
              }
            ]
          },
          {
            id: '4',
            label: '搅拌器',
            x: 406,
            y: 278,
            children: [
              {
                id: '41',
                label: '搅拌器'
              }
            ]
          },
          {
            id: '5',
            label: '控制与监控',
            x: 876,
            y: 0,
            children: [
              {
                id: '51',
                label: '反应釜液位计'
              }
            ]
          },
          {
            id: '6',
            label: '密封系统',
            x: 876,
            y: 200,
            children: [
              {
                id: '61',
                label: '石蜡循环泵'
              },
              {
                id: '62',
                label: '石蜡液位计'
              },
              {
                id: '63',
                label: '机械密封'
              },
              {
                id: '64',
                label: '石蜡压力变送器'
              }
            ]
          }
        ],
        edges: [
          {
            start: '1',
            end: '2',
          },
          {
            start: '2',
            end: '3'
          },
          {
            start: '3',
            end: '4',
            options: {
              startSocketGravity: [0, -1],
              endSocketGravity: [0, 0]
            }
          },
          {
            start: '4',
            end: '5',
            options: {
            }
          },
          {
            start: '4',
            end: '6',
            options: {
            }
          },
        ]
      },
      leaderLines: []
    };
  },

  computed: {},

  watch: {},

  methods: {
    loadData() {
      // this.relatedData = []
    },
    drawLines() {
      const edges = this.relatedData.edges || [];

      edges.forEach((edge) => {
        const s = this.$refs['node' + edge.start][0];
        const e = this.$refs['node' + edge.end][0];
        console.log(s, e);
        if (s && e) {
          let edgeOpts = edge.options || {};
          this.leaderLines.push(
            new LeaderLine(s, e, {
              color: '#2E6DDC',
              size: 2,
              path: "grid",
              endPlug: "behind",
              ...edgeOpts
            })
          );
        }
      });
    }
  },

  created() {
  },

  mounted() {
    this.$nextTick(() => {
      this.drawLines();
    });
  },

  beforeDestroy() {
    this.leaderLines.forEach((line) => {
      line.remove();
    });
    this.leaderLines = [];
  }
};
</script>

<style lang='less' scoped>
.ledger {
  position: relative;
  width: 1120px;
  height: 550px;
  overflow: auto;
  .ledger-node {
    position: absolute;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px dashed #296ADC;
    padding:  16px 34px 20px 34px;

    text-align: center;
    .node-label {
      font-size: 20px;
      color: #2b2b2b;
      margin-bottom: 16px;
    }
    .sub-node {
      width: 174px;
      height: 45px;
      line-height: 45px;
      background: #397CEB;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      box-shadow: 0px 7px 7px 0px rgba(57,124,235,0.24);
    &+.sub-node{
      margin-top: 7px;
    }
    }
  }
}
</style>
