<template>
  <div class="input">
    <h2 class="input__title">
      Введите данные для предустановки значений программы слежения за работой оборудования
    </h2>
    <div class="input__wrap">
      <label class="input__label">
        <div class="input__label-title">
          Таб №*
        </div>
        <input
          v-model="persNumber"
          class="input__input"
          placeholder="Табельный номер"
          required
        >
        <p v-if="!persNumberError" class="input__label-info">
          Введите табельный номер сотрудника
        </p>
        <p v-else class="input__label-info input__label-info_error">
          {{ persNumberError }}
        </p>
      </label>
      <label class="input__label">
        <div class="input__label-title">
          Минимальное значение*
        </div>
        <input
          v-model="min"
          class="input__input"
          placeholder="Минимальное значение"
          required
        >
        <p v-if="!minError" class="input__label-info">
          Введите минимально допустимое значение
        </p>
        <p v-else class="input__label-info input__label-info_error">
          {{ minError }}
        </p>
      </label>
      <label class="input__label">
        <div class="input__label-title">
          Максимальное значение*
        </div>
        <input
          v-model="max"
          class="input__input"
          placeholder="Максимальное значение"
          required
        >
        <p v-if="!maxError" class="input__label-info">
          Введите максимально допустимое значение
        </p>
        <p v-else class="input__label-info input__label-info_error">
          {{ maxError }}
        </p>
      </label>
      <label class="input__label">
        <div class="input__label-title">
          Критический шаг изменения*
        </div>
        <input
          v-model="jump"
          class="input__input"
          placeholder="Критический шаг изменения"
          required
        >
        <p v-if="!jumpError" class="input__label-info">
          Максимально допустимый скачок изменения значения
        </p>
        <p v-else class="input__label-info input__label-info_error">
          {{ jumpError }}
        </p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      email: '',
      password: '',
      valid: false,
      error: '',
      persNumberError: false,
      minError: false,
      maxError: false,
      jumpError: false
    }
  },
  computed: {
    persNumber: {
      get () {
        return this.$store.getters.getPersNumber
      },
      set (value) {
        this.validatePersNumber(value)
      }
    },
    min: {
      get () {
        return this.$store.getters.getMin
      },
      set (value) {
        this.validateMin(value)
      }
    },
    max: {
      get () {
        return this.$store.getters.getMax
      },
      set (value) {
        this.validateMax(value)
      }
    },
    jump: {
      get () {
        return this.$store.getters.getJump
      },
      set (value) {
        this.$store.commit('setJump', value.replace(/\D/g, ''))
      }
    }
  },
  methods: {
    validatePersNumber (value) {
      if (/\D/.test(value)) {
        this.persNumberError = 'Вводить только цифры'
      } else if (value.length < 4) {
        this.persNumberError = 'Таб № должен быть более 4 символов'
      } else {
        this.persNumberError = ''
      }
      this.$store.commit('setPersNumber', value.replace(/\D/g, ''))
    },
    validateMin (value) {
      if (/\D/.test(value)) {
        this.minError = 'Вводить только цифры'
      } else if (this.$store.getters.getMax && Number(this.$store.getters.getMax) < Number(value)) {
        this.minError = 'Минимальное должно быть меньше максимального'
      } else {
        this.minError = ''
      }
      this.$store.commit('setMin', value.replace(/\D/g, ''))
    },
    validateMax (value) {
      if (/\D/.test(value)) {
        this.maxError = 'Вводить только цифры'
      } else if (this.$store.getters.getMin && Number(this.$store.getters.getMin) > Number(value)) {
        this.maxError = 'Максимальное должно быть больше минимального'
      } else {
        this.maxError = ''
      }
      this.$store.commit('setMax', value.replace(/\D/g, ''))
    },
    validateJamp (value) {
      if (/\D/.test(value)) {
        this.jampError = 'Вводить только цифры'
      } else {
        this.jampError = ''
      }
      this.$store.commit('setJamp', value.replace(/\D/g, ''))
    }
  }
}
</script>

<style lang='scss' scoped>
.input {
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
  &__wrap {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 10px;
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
    position: relative;
    padding: 8px 18px 12px;
    margin-bottom: 20px;
    border: 1px solid #D7D7E7;
    border-radius: 10px;
    width: 310px;
    @include transition;
    &:focus-within {
      border-color: #0666EB;
      .input__label-title {
        color: #0666EB;
      }
      .input__label-info {
        opacity: 1;
      }
    }
  }
  &__label-title {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #A6A9B6;
    @include transition;
  }
  &__label-info {
    position: absolute;
    margin: 0;
    inset: auto auto 0 18px;
    font-size: 10px;
    color: #A6A9B6;
    opacity: 0;
    @include transition;
    &_error {
      opacity: 1;
      color: #EA0C0E;
    }
  }
  &__wrap-input {
    position: relative;
    width: 100%;
  }
  &__input {
    width: 100%;
    color: #121B2F;
  }
  &__input-btn {
    position: absolute;
    inset: 0 0 auto auto;
  }
}
</style>
