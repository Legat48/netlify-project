<template>
  <div
    class="base-info"
  >
    <div class="base-info__title">
      {{ title }}
    </div>
    <div class="base-info__value">
      <template>
        {{ value }}
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: '',
      require: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  position: relative;
  display: flex;
  justify-items: center;
  min-width: 200px;
  border-radius: 7px;
  border: 1px solid var(--color-border-1);
  color: var(--color-text-1);
  &__title {
    display: flex;
    align-items: center;
    padding: 0 7px;
    border-right: 1px solid var(--color-border-1);
    width: auto;
    height: 100%;
    font-weight: 500;
  }
  &__value {
    display: flex;
    align-items: center;
    padding: 0 17px;
    width: auto;
    font-weight: 600;
  }
}
</style>
