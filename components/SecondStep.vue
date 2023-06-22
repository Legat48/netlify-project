<template>
  <div class="test">
    <h2 class="test__title">
      СУММА   ВАШЕГО   ПОРТФЕЛЯ   АКЦИЙ?
    </h2>
    <div class="test__list">
      <button
        v-for="item in testItem"
        :key="item.id"
        class="test__btn btn"
        @click.prevent="changeСhoice(item.id)"
      >
        <div
          class="test__img"
        >
          <img :class="{'test__icon_active': item.id === itemId}" class="test__icon" :src="require(`~/assets/images/daw.svg`)">
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
      testItem: testItem.testItem2
    }
  },
  computed: {
    itemId () {
      return this.$store.getters.getDeskTwo
    }
  },
  methods: {
    changeСhoice (id) {
      this.$store.commit('setDeskTwo', id)
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
      flex-wrap: wrap;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    margin-bottom: sizeIncr(13, 20);
    width: 100%;
    @media (min-width: 768px) {
      padding-left: sizeIncr(40, 120);
      width: 48%;
    }
  }
  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: sizeIncr(13, 20);
    border: 2px solid var(--color-border-2);
    border-radius: 105px;
    width: 26px;
    height: 26px;
  }
  &__icon {
    width: 26px;
    height: 26px;
    opacity: 0;
    @include transition;
    &_active {
      opacity: 1;
    }
  }
  &__text {
    margin-bottom: 0;
    font-weight: 600;
    font-size: sizeIncr(14, 18);
    color: var(--color-text-1) !important;
    line-height: 120%;
  }
}
</style>
