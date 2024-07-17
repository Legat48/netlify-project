<template>
  <div class="wrap">
    <div class="wrap__top-wrap">
      <div class="wrap__title">
        Представление плавки
      </div>
      <label class="wrap__search">
        <svg
          class="wrap__search-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
        >
          <path
            d="M5.50006 0C8.53765 0 11.0001 2.46256 11.0001 5.50029C11.0001 6.74868 10.5842 7.89993 9.88346 8.82304L13.7791 12.7233C14.0718 13.0164 14.0715 13.4913 13.7785 13.784C13.4854 14.0767 13.0105 14.0764 12.7178 13.7834L8.82266 9.88388C7.89959 10.5847 6.74839 11.0006 5.50006 11.0006C2.46246 11.0006 0 8.53802 0 5.50029C0 2.46256 2.46246 0 5.50006 0ZM5.50006 1.5C3.2909 1.5 1.5 3.29098 1.5 5.50029C1.5 7.70961 3.2909 9.50058 5.50006 9.50058C7.70921 9.50058 9.50011 7.70961 9.50011 5.50029C9.50011 3.29098 7.70921 1.5 5.50006 1.5Z"
            fill="#818C99"
          />
        </svg>
        <input
          v-model="heat"
          type="number"
          class="wrap__search-input btn"
          placeholder="Номер плавки"
          @keyup.enter="fetchInfo()"
          @input="!!json && reset(false)"
        >
      </label>
      <button class="btn btn_standard wrap__btn" :class="{ 'error': error }" @click="fetchInfo()">
        Получить JSON
      </button>
    </div>
    <div class="wrap__sub-title">
      Состав json :
    </div>
    <div class="wrap__wrap">
      <template v-if="json && !loading">
        <BaseDropdown
          v-for="(item, key) of json"
          :key="key"
          :method-name="methodName"
          :json="item"
          :title="key"
          :drop="typeof (item) === 'object'"
          :value="typeof (item) === 'object' ? '' : item"
        />
      </template>
    </div>
    <div v-if="json && !loading" class="wrap__wrap-btn">
      <button class="btn btn_standard wrap__btn-copy" @click="copySmelting()">
        <!-- <v-icon color="white">
          mdi-content-copy
        </v-icon> -->
        Копировать JSON плавки в буфер
      </button>
      <button class="btn btn_standard wrap__btn-copy" @click="copyScheme()">
        <!-- <v-icon color="white">
          mdi-content-copy
        </v-icon> -->
        Копировать JSON схему в буфер
      </button>
    </div>
    <div v-if="loading" class="wrap__pre-loaded ">
      <PreLoaded />
    </div>
  </div>
</template>

<script>
import copyToClipboard from '~/helpers/copyToClipboard'
export default {
  name: 'JSONWrap',
  props: {
    methodName: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      error: false,
      loading: false
    }
  },
  computed: {
    json () {
      return this.$store.getters['smelting/getInfo']
    },
    scheme () {
      return this.$store.getters['smelting/getScheme']
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
      this.$store.commit('smelting/setInfo', '')
      const result = await this.$store.dispatch('smelting/fetchInfo')
      this.loading = false
      if (!result) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 1200)
      }
    },
    reset (clean) {
      this.$store.commit('setLoading', true)
      this.$store.commit('smelting/setInfo', null)
      if (clean) {
        this.heat = ''
      }
      this.$store.commit('setLoading', false)
    },
    copySmelting () {
      copyToClipboard(JSON.stringify(this.json))
    },
    copyScheme () {
      copyToClipboard(JSON.stringify(this.$store.getters['smelting/getBaseScheme']))
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  &__top-wrap {
    position: sticky;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    gap: 30px;
    border-bottom: 3px solid var(--color-border-1);
    padding: 0 15px;
    height: 80px;
    min-height: 80px;
    background-color: var(--color-bg-white-1);
  }

  &__wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 6px 0 0;
    padding: 0;
    max-height: 100%;
    overflow: auto;
  }

  &__title {
    margin-right: auto;
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text-1);
  }

  &__sub-title {
    position: sticky;
    inset: 0 0 auto 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 3px solid var(--color-border-1);
    padding: 15px;
    font-weight: 500;
    font-size: 24px;
    color: var(--color-text-1);
    background-color: var(--color-bg-white-1);
  }

  &__search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    border-radius: 4px;
    border: 2px solid var(--color-border-1);
    max-width: 280px;
    padding: 0px 12px;
    height: 40px;
    font-weight: 500;
    background-color: var(--color-btn-white-1);
    @include transition;
    cursor: text;

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    &::before {
      content: 'Поиск плавки';
      position: absolute;
      inset: -10px auto auto 18px;
      z-index: 2;
      padding: 0 4px;
      font-size: 14px;
      font-weight: 500;
      background-color: var(--color-text-white-1);
      color: var(--color-border-1);
      @include transition;
    }

    path {
      fill: var(--color-border-1);
    }

    &:focus-within {
      border: 2px solid var(--color-border-3);

      &::before {
        color: var(--color-border-3);
      }

      path {
        fill: var(--color-border-3);
      }
    }
  }

  &__search-svg {
    position: relative;
    z-index: 3;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
  }

  &__search-input {
    max-width: 230px;
    text-align: left;
    font-size: 16px;
    color: var(--color-text-1);
    cursor: text;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 4px;
    height: 40px;
    white-space: nowrap;
    font-weight: 500;
    font-size: 18px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    @include transition;
    path {
      fill: var(--color-text-white-1) !important;
    }
  }

  &__btn.error {
    border-color: #ff0000 !important;
    color: #ff0000 !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 4px #ff0000 !important;
    animation: shake 0.5s infinite;
  }

  &__pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70%;
  }

  &__wrap-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 6px 12px 12px 12px;
    border-top: 3px solid var(--color-border-1);
    gap: 12px;
  }
  &__btn-copy {
    height: 50px;
    padding: 0 20px;
    font-size: 20px;
  }
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-5px, 0);
  }

  50% {
    transform: translate(5px, 0);
  }

  75% {
    transform: translate(-5px, 0);
  }

  100% {
    transform: translate(5px, 0);
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

<style lang="scss">
.wrap {
  .v-treeview-node__root {
    min-height: 25px !important;
  }
}
</style>
