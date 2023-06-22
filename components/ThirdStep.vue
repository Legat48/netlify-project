
<template>
  <div class="test">
    <h2 class="test__title">
      КОНТАКТЫ  ДЛЯ  ОБРАТНОЙ  СВЯЗИ
    </h2>
    <button
      v-ripple
      :class="{'test__btn_deactive': $store.getters.getName.length < 3 || $store.getters.getPhone.length < 12}"
      class="test__btn test__btn_submit btn"
      @click.prevent="nextStep()"
    >
      <div class="test__text-submit" style="color: #fff !important;">
        Отправить
      </div>
      <img class="test__btn-icon" :src="require(`~/assets/images/submit-icon.svg`)">
    </button>
    <!-- Инпут для ввода имени -->
    <label class="test__label">
      <div class="test__label-text">Ваше имя</div>
      <input
        v-model="name"
        class="test__input"
        placeholder="Имя"
      >
    </label>

    <!-- Инпут для ввода телефона -->
    <label class="test__label">
      <div class="test__label-text">Ваш телефон</div>
      <input
        v-model="phone"
        class="test__input"
        placeholder="+7 (999) 999-9999"
      >
      <div class="test__label-info">Введите номер телефона в формате: +7 (999) 999-9999</div>
    </label>
  </div>
</template>

<script>
export default {
  computed: {
    name: {
      get () {
        return this.$store.getters.getName
      },
      set (value) {
        this.$store.commit('setName', value.replace(/[^a-zA-Zа-яА-Я\s]/g, ''))
      }
    },
    phone: {
      get () {
        return this.$store.getters.getPhone
      },
      set (value) {
        if (value && `${value}`.substr(0, 1) === '9') {
          value = '+79'
        } else if (value && `${value}`.substr(0, 1) !== '+') {
          value = '+7'
        }
        value = value.replace(/[a-zа-яё]/gi, '')
        this.$store.commit('setPhone', value)
      }
    }
  },
  methods: {
    async nextStep () {
      if (this.$store.getters.getStatusApp < 3) {
        this.$store.commit('setStatusApp', this.$store.getters.getStatusApp + 1)
      } else {
        // не дожидаясь ответа листаем
        this.$store.commit('setStatusApp', 4)
        await this.$store.dispatch('submit')
      }
    }
  }

}
</script>

<style lang='scss' scoped>
.test {
  display: flex;
  flex-direction: column;
  padding: 0 sizeIncr(0, 128);
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
    &_submit {
      display: flex;
      align-items: center;
      margin: 0 auto 20px;
      padding: 0 20px;
      border-radius: 5px;
      width: auto;
      height: 56px;
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
    }
    &_deactive {
      pointer-events: none;
      border-color: var(--color-border-1) !important;
      background-color: var(--color-btn-deactive-1) !important;
    }
    @media (min-width: 768px) {
      padding-left: sizeIncr(40, 120);
      width: 48%;
      &_submit {
        display: none;
      }
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
  &__btn-icon {
    width: 24px;
    height: 24px;
  }
  &__text {
    margin-bottom: 0;
    font-weight: 600;
    font-size: sizeIncr(14, 18);
    line-height: 120%;
    color: var(--color-text-1) !important;
  }
  &__text-submit {
    margin-right: 14px;
    font-family: 'Inter';
    font-weight: 800;
    font-size: 17px;
    line-height: 140%;
  }
  &__label {
    margin-bottom: sizeIncr(20, 37);
    width: 100%;
  }
  &__label-text {
    margin-bottom: sizeIncr(7, 12);
    word-spacing: sizeIncr(2, 5);
    font-family: 'DelaGothicOne';
    font-size: sizeIncr(12, 16);
    line-height: 140%;
    text-transform: uppercase;
    color: var(--color-text-1);
  }
  &__input {
    border-bottom: 1px solid var(--color-border-1);
    width: 100%;
    font-weight: 500;
    font-size: sizeIncr(16, 21);
    line-height: 140%;
    color: var(--color-text-1);
    &::placeholder {
      font-style: normal;
      font-weight: 700;
      font-size: 21px;
      line-height: 140%;
      text-transform: uppercase;
    }
    @include transition;
    &:focus-within {
      border-color: var(--color-border-2);
    }
  }
  &__label-info {
    font-family: 'Inter';
    font-size: sizeIncr(9, 12) !important;
    line-height: 140%;
    color: var(--color-text-3);
  }
}
</style>
