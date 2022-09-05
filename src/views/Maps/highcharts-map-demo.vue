<template>
    <div class="a-map" :id="renderId"></div>
</template>

<script>
import Highcharts from 'highcharts';
import Highmaps from 'highcharts/modules/map';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
Highmaps(Highcharts);
HighchartsDrilldown(Highcharts);
// 示例：https://jshare.com.cn/highmaps/FSSm7A
export default {
  name: "a-map",
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    },
    // 显示区域，默认china
    area: {
      type: String,
      default: 'china'
    }
  },

  data() {
    return {
      highchartsMapTarget: null,
      data: []
    };
  },

  computed: {
    renderId() {
      return 'AMapContainer' + this.id;
    }
  },

  watch: {},

  methods: {
    init() {
      const that = this;
      that.getGeoJsonData('china', function(mapdata) {
        console.log(393939, mapdata);
        let data = [];
        Highcharts.each(mapdata.features, function(md, index) {
          // 南海诸岛标识不需要填充数据
          if (md.properties.name === '南海诸岛') {
            return;
          }
          let tmp = {
            name: md.properties.name,
            value: Math.floor((Math.random() * 100) + 1) // 生成 1 ~ 100 随机值
          };
          if (md.properties.filename) {
            tmp.drilldown = md.properties.filename;
          }
          if (md.properties.offset) {
            md.properties['hc-middle-x'] = md.properties.offset[0];
            md.properties['hc-middle-y'] = md.properties.offset[1];
          }
          data.push(tmp);
        });
        that.data = data.splice(0, 7);
        console.log(68686868, data);

        that.highchartsMapTarget = Highcharts.Map(that.renderId, {
          lang: {
            drillUpText: '< 返回{series.name}'
          },
          title: { text: null },
          credits: { enabled: false },
          chart: {
            type: 'map',
            events: {
              drilldown: function (chart) {
                console.log('drilldown', chart);
                that.onDrilldown(chart);
              },
              drillup: function (chart) {
                that.highchartsMapTarget.setTitle({ text: chart.seriesOptions.name });
              }
            }
          },
          // mapNavigation: {
          //   enabled: true,
          //   buttonOptions: {
          //     verticalAlign: 'bottom'
          //   }
          // },
          plotOptions: {
            map: {
              borderColor: '#f00',
              borderWidth: 0.5,
              color: '#0f0',
              nullColor: '#ff0'
            }
          },
          drilldown: {
            drillUpButton: {
              relativeTo: 'align',
              position: {
                align: 'right'
                // y: 0,
                // x: 0
              },
              theme: {
                fill: 'white',
                'stroke-width': 1,
                stroke: 'silver',
                r: 0,
                states: {
                  hover: {
                    fill: '#a4edba'
                  },
                  select: {
                    stroke: '#039',
                    fill: '#a4edba'
                  }
                }
              }
            }
          },
          legend: {
            enabled: false
          },
          series: [{
            name: '中国',
            data: that.data,
            mapData: mapdata,
            joinBy: ['name', 'name']
          }]
        });
      });
    },
    onDrilldown(chart) {
      console.log(1111, chart.point);
      const that = this;
      if (chart.point.properties && chart.point.properties.level === 'city') return;
      if (chart.point.drilldown) {
        let pointName = chart.point.properties.fullname;

        this.getGeoJsonData(chart.point.drilldown, data => {
          that.data = Highcharts.geojson(data);
          // that.data = Highcharts.geojson(data);
          console.log(118118118, that.data);
          Highcharts.each(that.data, function (d) {
            if (d.properties.filename) {
              d.drilldown = d.properties.filename;
            }
            if (d.properties.offset) {
              d.properties['hc-middle-x'] = d.properties.offset[0];
              d.properties['hc-middle-y'] = d.properties.offset[1];
            }
            d.value = Math.floor((Math.random() * 100 + 1));
          });
          that.highchartsMapTarget.addSeriesAsDrilldown(chart.point, {
            name: chart.point.name,
            data: that.data
          });

          that.highchartsMapTarget.setTitle({ text: pointName });
        });
      }
    },
    getGeoJsonData(area = 'china', callback) {
      // $.getJSON(`https://geojson.cn/data/${area}.json`, function (data) {
      $.getJSON(`https://data.jianshukeji.com/jsonp?filename=geochina/${area}.json&callback=?`, function (data) {
        callback(data);
      });
    }
  },

  created() {
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.a-map {
  height: 500px;
  width: 500px;
}
</style>
