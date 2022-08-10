<template>
  <div class="date-picker-demo">
    <a-date-picker :week-start="1" format="yyyy/MM/dd" type="week" v-model="rweek"  @change="onChange">
      <template slot="footer">
        <div @click="datepickerType = 'week'">自然周</div>
        <div @click="datepickerType = 'month'">自然月</div>
      </template>
<!--      <template slot="value">-->
<!--        啊啊{{ this.rweek }}-->
<!--      </template>-->
    </a-date-picker>

    <a-date-picker type="month"  v-model="rmonth"  @change="onChange">
      <template slot="footer">
        <div @click="datepickerType = 'week'">自然周</div>
        <div @click="datepickerType = 'month'">自然月</div>
      </template>
      <!--      <template slot="value">-->
      <!--        啊啊{{ this.rweek }}-->
      <!--      </template>-->
    </a-date-picker>
  </div>
</template>

<script>
import ADatePicker from '@/components/a-date-picker/index';

export default {
  name: "date-picker-demo",
  components: {
    ADatePicker
  },
  props: {},

  data() {
    return {
      datepickerType: 'week',
      rweek: [],
      rmonth: []
    };
  },

  computed: {},

  watch: {},

  methods: {
    onChange ({ type, value, src }, v) {
      console.log('*******', type, value, src)
    }
  },

  created() {
  },

  mounted() {
  },

  beforeDestroy() {
  }
};
</script>

<style lang='less' scoped>
.date-picker-demo {
}
</style>
