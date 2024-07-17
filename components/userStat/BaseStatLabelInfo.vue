<template>
  <div class="stat-label">
    <label v-for="(item, index) in labelArr" :key="index" class="stat-label__label" :style="`max-width: ${item.maxWight}px`">
      <div class="stat-label__label-title">
        {{ item.title }}
      </div>
      <div class="stat-label__text">
        {{ item.value }}
      </div>
    </label>
  </div>
</template>
<script>
// Импорты и определение компонента
export default {
  props: {
    labelArr: {
      type: Array,
      default: null,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.stat-label {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);

  &__text {
    font-size: 18px;
    font-weight: 500;
  }

  &__label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    border-radius: 4px;
    border: 2px solid var(--color-border-1);
    width: 100%;
    padding: 5px 12px;
    min-height: 40px;
    font-weight: 500;
    background-color: var(--color-btn-white-1);
    @include transition;
    cursor: text;
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    path {
      fill: var(--color-border-1);
    }

    &:focus-within {
      border: 2px solid var(--color-border-3);

      .table__label-input,
      .table__label-title {
        color: var(--color-border-3);
      }

      path {
        fill: var(--color-border-3);
      }
    }
  }

  &__label-title {
    position: absolute;
    inset: -10px auto auto 6px;
    z-index: 2;
    padding: 0 4px;
    font-size: 12px;
    font-weight: 500;
    background-color: var(--color-text-white-1);
    color: var(--color-border-1);
    @include transition;
  }
}
</style>
