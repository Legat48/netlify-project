<template>
  <footer class="footer">
    <v-btn
      class="footer__btn footer__btn_back"
      :class="{
        'opacity': $store.getters.getStatusApp === 1,
      }"
      color="transparent"
      @click.prevent="previousStep()"
    >
      <v-icon class="footer__btn-icon" color="#109CF8">
        mdi-arrow-left
      </v-icon>
      <span style="color: #109CF8 !important;">
        Назад
      </span>
    </v-btn>
    <div class="footer__wrap">
      <BaseProgress class="footer__progress" :step="$store.getters.getStatusApp" :total="2" :color="'109CF8'" :size="60" />
    </div>

    <v-btn
      :class="{
        'opacity': $store.getters.getStatusApp === 2,
        'footer__btn_deactive': !$store.getters.getMin || !$store.getters.getMax || !$store.getters.getPersNumber || !$store.getters.getJump || ($store.getters.getMax && $store.getters.getMin && $store.getters.getMax - $store.getters.getMin < 0)
      }"
      class="footer__btn footer__btn_next"
      @click.prevent="nextStep()"
    >
      <span class="footer__btn-text">
        Вперед
      </span>
      <v-icon class="footer__btn-icon" color="#109CF8">
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </footer>
</template>

<script>
export default {
  methods: {
    nextStep () {
      this.$store.commit('setStatusApp', this.$store.getters.getStatusApp + 1)
    },
    previousStep () {
      this.$store.commit('setStatusApp', this.$store.getters.getStatusApp - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}

.footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: sizeIncr(16, 32) sizeIncr(16, 32) 3px ;
  color: var(--color-text-1);
  background-color: #fff !important;
  &:hover {
    background-color: #fff !important;
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  &__progress {
    margin-bottom: sizeIncr(15, 20);
  }
  &__link {
    max-width: sizeIncr(224, 500);
    font-size: 12px;
    color: var(--color-text-1) !important;
    text-align: center;
    span {
      color: var(--color-text-2) !important;
    }
  }
  &__btn {
    position: absolute !important;
    inset: 10px auto auto 0;
    border: 2px solid var(--color-border-2) !important;
    width: sizeIncr(64, 207);
    height: 56px !important;
    color: var(--color-text-2);
    @include transition;
    &_next {
      inset: 10px 0 auto auto;
    }
    &_form {
      display: none;
    }
    @media (min-width: 768px) {
      position: relative !important;
      inset: auto auto auto auto;
      display: flex;
      &_form {
        display: flex;
      }
    }
    &_deactive {
      pointer-events: none;
      border-color: var(--color-border-1) !important;
      background-color: var(--color-btn-deactive-1) !important;
      .footer__btn-text,
      .footer__btn-icon {
        @include transition;
        color: var(--color-text-white-1) !important;
      }
    }
    span {
      display: none;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      @media (min-width: 768px) {
        display: flex;
      }
    }
  }
  &__text-submit {
    color: #fff;
    display: none;
    @media (min-width: 768px) {
      display: flex;
    }
  }
  &__btn-icon-submit {
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
