<template>
  <div v-if="!preload" class="info-wrap">
    <div class="info-wrap__sub-wrap info-wrap__sub-wrap_table">
      Место под таблицу или другую информацию
    </div>
    <div class="info-wrap__sub-wrap info-wrap__sub-wrap_chart">
      График
    </div>
    <div class="info-wrap__sub-wrap info-wrap__sub-wrap_system-info">
      Информация от системы
    </div>
  </div>
</template>
<script>
export default {
  name: 'AcvInfo',
  props: {
    type: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data () {
    return {
      preload: false
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.info-wrap {
  padding: 6px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 23% 33% 43%;
  gap: 6px;
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  &__sub-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 38px;
    overflow: hidden;
    text-align: center;
    &_table {
      background-color: grey;
    }
    &_chart{
      background-color: grey;
    }
    &_system-info {
      background-color: grey;
    }
  }
}
</style>
