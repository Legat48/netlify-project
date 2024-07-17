<template>
  <div class="header header_udm">
    <div class="header__row">
      <UdmBaseInfo
        :title="'Статус:'"
        :value="'обработка плавки'"
        class="header__status"
      />
      <UdmBaseInfo
        :title="'Плавка №'"
        :value="'2352518'"
        class="header__heat"
      />
      <UdmBaseInfo :title="'Ковш №'" :value="'8'" class="header__ladle" />
      <UdmBaseInfo
        :title="'До конца обработки осталось:'"
        :value="''"
        class="header__status"
      />
    </div>
    <div class="header__row">
      <UdmSelect class="header__select" />
      <button class="header__btn header__btn_add">
        +
      </button>
      <button class="header__btn header__btn_long">
        Завершить обработку
      </button>
      <button class="header__btn header__btn_long">
        Начать ремонт
      </button>
      <button class="header__btn header__btn_long">
        Начать инвентаризацию
      </button>
      <button class="header__btn-icon" icon>
        <!-- <v-icon> mdi-help-circle </v-icon> -->
      </button>
      <button class="header__btn header__btn_log">
        Журнал обработок
      </button>
      <button class="header__btn header__btn_version">
        2.0.0
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UdmHeader',
  props: {
    block: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 72px;
  background-color: var(--color-bg-white-1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  &__btn-icon {
    border: 2px solid;
    border-color: var(--color-btn-1);
    width: 28px;
    height: 28px;
    // background-color: var(--color-btn-1);
  }
  &__row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 6px;
    height: 30px;
    width: 100%;
    max-width: #{$maxvw}px;
  }
  &__select {
    display: flex;
    align-items: center;
    font-size: 36px;
    width: 200px;
    max-width: 200px;
    height: 28px;
    color: var(--color-text-1);
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 7px;
    height: 30px;
    background-color: var(--color-btn-1);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    @include transition;
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 3px var(--color-btn-1);
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
    &_add {
      display: flex;
      width: 28px;
      height: 28px;
      font-size: 28px;
      align-items: center;
    }
    &_long {
      display: flex;
      width: 200px;
      align-items: center;
      font-weight: 700;
      color: var(--color-text-1);
    }
    &_log {
      display: flex;
      align-items: center;
      width: 200px;
      margin-left: auto;
      color: var(--color-text-1);
    }
    &_version {
      display: flex;
      align-items: center;
      width: 50px;
      color: var(--color-text-1);
    }
  }
}
</style>
