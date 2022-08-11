<template>
  <div class="date-picker-demo">
    <a-date-picker
      :type="datepickerType"
      :week-start="1"
      :max="new Date()"
      rangeSingle
      format="yyyy/MM/dd"
      v-model="rdate"
      placeholder="请选择时间"
      show-lunar
    >
      <div slot="footer" class="date-picker-footer">
        <div @click="onChange('week')">自然周</div>
        <div @click="onChange('month')">自然月</div>
      </div>
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
      rdate: [],
    };
  },

  computed: {},

  watch: {},

  methods: {
    onChange (v) {
      // console.log('*******', type, value, src)
      this.datepickerType = v;
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
