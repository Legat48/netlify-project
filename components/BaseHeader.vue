<template>
  <header class="header">
    <button class="header__logo btn" @click.prevent="skip()">
      <img src="../assets/images/logo.svg" alt="Логотип">
    </button>
    <div class="header__wrap">
      <img class="header__icon header__icon_desk" src="../assets/images/header-icon.svg" alt="ИИ">
      <img class="header__icon" src="../assets/images/header-icon-mob.svg" alt="ИИ">
      <h1 v-if="$store.getters.getStatusApp !== 4" class="header__title">
        Ответьте на вопросы и <span>получите индивидуальное предложение</span> от нашего ИСКУССТВЕННОГО ИНТЕЛЛЕКТА
      </h1>
      <h1 v-if="$store.getters.getStatusApp === 4" class="header__title">
        Пока  Искусственный  Интеллект <span>подбирает для  вас</span>  индивидуальное предложение  Вы  можете:
      </h1>
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
  &__wrap {
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
  &__logo {
    position: absolute;
    inset: 0 0 auto auto;
    margin-bottom: sizeIncr(15, 34);
    border-radius: sizeIncr(4, 10);
    width: sizeIncr(64, 136);
    height: sizeIncr(23, 49);
    @media (min-width: 768px) {
      position: static;
    }
  }
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
