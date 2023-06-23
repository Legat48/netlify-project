<template>
  <header v-if="$store.getters.getStatusApp === 1" class="header">
    <div class="header__title">
      Экран ввода данных
    </div>
  </header>
  <header v-else class="header">
    <div class="header__title">
      Работа программы
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    skip () {
      this.$store.commit('setStatusApp', 1)
      this.$router.push({ path: `/${this.path}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &__title {
    max-width: sizeIncr(315, 861);
    word-spacing: sizeIncr(2, 5);
    font-family: 'DelaGothicOne';
    font-weight: 400;
    font-size: sizeIncr(15, 29);
    line-height: 120.5%;
    color: var(--color-text-1) !important;
    text-transform: uppercase;
    span {
      color: var(--color-text-2);
    }
  }
  &__icon {
    margin-right: 30px;
    width: sizeIncr(33, 122);
    height: sizeIncr(31, 115);
    &_desk {
      display: none;
    }
    @media (min-width: 768px) {
      display: none;
      &_desk {
        display: flex;
      }
    }
  }

}
</style>
