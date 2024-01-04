<template>
  <div class="select">
    <div class="buttons__title">
      {{ title }}
    </div>
    <div class="buttons__wrap">
      <button
        v-for="item of options"
        :key="item.id"
        v-ripple
        :class="{'buttons__btn_active' : item.id === selectedValue}"
        class="buttons__btn"
        @click="selectedValue = item.id"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSelect',
  props: {
    value: {
      type: Number,
      default: 0,
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: sizeIncr(5, 10);
  padding: sizeIncr(10, 15);
  border-radius: 9px;
  width: sizeIncr(150, 270);
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
  &__title {
    font-size: sizeIncr(14, 18);
    font-weight: 500;
  }
  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    border-radius: 5px;
    background-color: var(--color-bg-white-1);
  }
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: 0 8px;
    height: sizeIncr(35, 35);
    font-weight: 500;
    font-size: sizeIncr(14, 16);
    background-color: var(--color-btn-deactive-1);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    @include transition;
    &_active {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
      .switch__icon path {
        fill: var(--color-text-white-1)
      }
    }
  }
}
</style>
<style lang="scss">
.buttons__select {
  .v-input__control {
    height: 28px !important;
    min-height: auto !important;
  }
}
.theme--light.v-select .v-buttons__selections {
  color: var(--color-text-1) !important;
}
.v-sheet.v-list {
  border-radius: 12px !important;
  padding: 0 !important;
}

</style>
