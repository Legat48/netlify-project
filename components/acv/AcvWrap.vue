<template>
  <div v-if="!preload" class="wrap">
    <!-- Лево -->
    <AcvVizRep class="wrap__sub-wrap wrap__sub-wrap_viz-rep" />
    <!-- Право -->
    <AcvInfo class="wrap__sub-wrap wrap__sub-wrap_info" />
    <AcvModalForm />
  </div>
</template>
<script>
export default {
  name: 'AcvWrap',
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
.wrap {
position: relative;
  display: grid;
  grid-template-columns: 66% 34%;
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  &__sub-wrap {
    height: calc(100vh - var(--height-header) - 20px);
    width: 100%;
    &_viz-rep {
      height: calc(100vh - var(--height-header) - 20px);
    }
    &_info {
      background-color: green;
    }
  }
}
</style>
