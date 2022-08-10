<template>
  <div class="date-picker-demo">
<!--    <a-date-picker :week-start="1" format="yyyy/MM/dd" type="week" v-model="rweek"  @change="onChange" />-->

    <a-date-picker type="year" range v-model="year" format="yyyy" @change="onChange" />
    <a-date-picker type="month" rangeSingle format="yyyy/MM/dd" v-model="rmonth"  @change="onChange" />

<!--    <a-date-picker type="quarter" :value="rquarter"  @change="onChange">-->
<!--    </a-date-picker>-->
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
      month: '',
      rmonth: [],
      rquarter: [],
      year: []
    };
  },

  computed: {},

  watch: {},

  methods: {
    onChange ({ type, value, src }, v) {
      // console.log('*******', type, value, src)
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
