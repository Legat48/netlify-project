<template>
  <div class="wrap">
    <div class="wrap__top-wrap">
      <div class="wrap__title">
        Представление плавки
      </div>
      <label
        for="login"
        class="wrap__label"
        :class="{'wrap__label_disable' : !!json}"
      >
        <input
          ref="login"
          v-model="heat"
          class="wrap__input"
          placeholder="Номер плавки"
          required
        >
        <p class="wrap__label-info">
          Введите плавку
        </p>
      </label>
      <button v-if="!json" v-ripple class="btn btn_standard wrap__btn" @click="fetchInfo()">
        Получить JSON
      </button>
      <button v-if="json" v-ripple class="btn btn_standard btn_reset wrap__btn" @click="reset()">
        Сбросить
      </button>
    </div>
    <div v-if="json" class="wrap__wrap">
      <JSONList :json="json" />
      <div class="wrap__wrap-textarea">
        <div class="wrap__sub-title">
          Состав json
          <button v-ripple class="btn btn_standard" @click="copy()">
            <v-icon color="white">
              mdi-content-copy
            </v-icon>
            Копировать
          </button>
        </div>
        <v-textarea
          :value="JSON.stringify(json)"
          readonly
          outlined
        />
      </div>
    </div>
  </div>
</template>

<script>
import copyToClipboard from '~/helpers/copyToClipboard'
export default {
  name: 'JSONWrap',
  computed: {
    json () {
      return this.$store.getters['smelting/getInfo']
    },
    heat: {
      get () {
        return this.$store.getters['smelting/getNumberHeat']
      },
      set (heat) {
        return this.$store.commit('smelting/setNumberHeat', heat)
      }
    }
  },
  methods: {
    async fetchInfo () {
      this.$store.commit('setLoading', true)
      this.$store.commit('smelting/setInfo', '')
      await this.$store.dispatch('smelting/fetchInfo')
      this.$store.commit('setLoading', false)
    },
    reset () {
      this.$store.commit('setLoading', true)
      this.$store.commit('smelting/setInfo', null)
      this.heat = ''
      this.$store.commit('setLoading', false)
    },
    copy () {
      copyToClipboard(JSON.stringify(this.json))
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  padding: 15px;
  height: 100%;

  &__wrap {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  &__top-wrap {
    position: sticky;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--color-bg-white-1);

  }
  &__title {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text-1);
  }
  &__sub-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 24px;
    color: var(--color-text-1);
  }
  &__label {
    position: relative;
    padding: 8px 15px 8px;
    margin-left: auto;
    border-radius: 10px;
    min-width: 330px;
    background-color: var(--color-bg-1);
    opacity: 0.8;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &:focus-within {
      opacity: 1;
      .login__label-info {
        opacity: 1;
      }
    }
    &_disable {
      pointer-events: none;
    }
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
    color: var(--color-text-1);
  }
  &__subwrap {
    display: flex;
    align-items: center;
  }
  &__btn-add {
    position: absolute;
    inset: auto 30px 30px auto;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 35px;
    z-index: 11;
    font-size: 30px;
    font-weight: 500;
    border-radius: 10px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 4px var(--color-btn-1);
      .table__icon-add {
        transform: rotate(90deg);
      }
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
      .table__icon-add {
        transform: rotate(180deg);
      }
    }
  }
  &__icon-add {
    @include transition;
    pointer-events: none;
    width: 30px;
    height: 30px;
  }
}
.table-slide-enter-active,
.table-slide-leave-active {
  transition-property: box-shadow, border, outline, color, background-color, transform, fill, stroke, opacity, filter, font-weight, font-size;
  transition-duration: 0.05s;
  transition-timing-function: ease-in-out;
}
.table-slide-enter,
.table-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.table-slide-right-enter-active,
.table-slide-right-leave-active {
  @include transition;
}
.table-slide-right-enter,
.table-slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
