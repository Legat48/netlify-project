<template>
  <v-progress-circular
    :size="size"
    rotate="-90"
    color="#109CF8"
    :value="increment * step"
    :max="increment * total"
  >
    <span class="text">{{ step }}/{{ total }}</span>
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 3
    },
    size: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: 'inherit'
    }
  },
  computed: {
    increment () {
      return 100 / this.total
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 16px;
  color: var(--color-text-1) !important;
}
</style>
