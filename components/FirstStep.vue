<template>
  <div class="test">
    <h2 class="test__title">
      ДЛЯ  КАКИХ  ЦЕЛЕЙ  ВАМ  БЫЛИ  БЫ  ИНТЕРЕСНЫ  ПРОГНОЗЫ  НАШЕГО  ИИ?
    </h2>
    <div class="test__list">
      <button
        v-for="item in testItem"
        :key="item.id"
        class="test__btn btn"
        @click.prevent="changeСhoice(item.id)"
      >
        <div
          :class="{'test__img_active': item.id === itemId}"
          class="test__img"
        >
          <div class="test__icon-wrap">
            <img class="test__icon" :src="require(`~/assets/images/daw.svg`)" alt="Ок">
          </div>
          <img class="test__img-svg" :src="require(`~/assets/images/step-1-${item.id}.svg`)" alt="Иконка">
        </div>
        <p class="test__text" style="text-align: start;">
          {{ item.text }}
        </p>
      </button>
    </div>
  </div>
</template>

<script>
import testItem from '~/helpers/testItem'
export default {
  data () {
    return {
      testItem: testItem.testItem1
    }
  },
  computed: {
    itemId () {
      return this.$store.getters.getDeskOne
    }
  },
  methods: {
    changeСhoice (id) {
      this.$store.commit('setDeskOne', id)
    }
  }
}
</script>

<style lang='scss' scoped>
.test {
  width: 100%;
  &__title {
    margin-bottom: sizeIncr(22, 44);
    word-spacing: sizeIncr(2, 5);
    width: 100%;
    text-align: center;
    font-family: 'DelaGothicOne';
    font-size: sizeIncr(12, 20);
    line-height: 140%;
    text-transform: uppercase;
    color: var(--color-text-1) !important;
  }
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: start;
      justify-content: space-between;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    margin-bottom: sizeIncr(13, 20);
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
    @media (min-width: 768px) {
      margin-bottom: 0;
      flex-direction: column;
      margin-right: sizeIncr(10, 50);
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    border: 2px solid var(--color-border-1);
    border-radius: 5px;
    width: sizeIncr(51, 170);
    height: sizeIncr(51, 170);
    @include transition;
    &_active {
      border: 2px solid var(--color-border-2);
      .test__icon-wrap {
        opacity: 1;
      }
    }
    @media (min-width: 768px) {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }
  &__img-svg {
    width: sizeIncr(37, 68);
    height: sizeIncr(37, 68);
  }
  &__icon-wrap {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: sizeIncr(-6, -12) 0 auto 0;
    opacity: 0;
    @include transition;
  }
  &__icon {
    width: sizeIncr(13, 25);
    height: sizeIncr(11, 22);
  }
  &__text {
    margin-bottom: 0;
    width: sizeIncr(240, 500);
    font-weight: 500;
    font-size: sizeIncr(12, 14);
    line-height: 120%;
    color: var(--color-text-1) !important;
    @media (min-width: 768px) {
      width: sizeIncr(51, 170);
    }
  }
}
</style>
