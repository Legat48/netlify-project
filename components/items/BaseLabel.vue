<template>
  <label
    class="label"
    :class="{'label_active' : !!inputValue,
             'label_error': !rules}"
  >
    <div v-if="title" class="label__title">
      {{ title }}
    </div>
    <div class="label__wrap-input">
      <input
        v-if="!textarea"
        v-model="inputValue"
        class="label__input"
        :type="password && !show ?'password' : 'text'"
        :placeholder="placeholder"
        required
      >
      <textarea
        v-if="textarea"
        id=""
        v-model="inputValue"
        class="label__input label__input_textarea"
        :placeholder="placeholder"
        required
        name=""
      />
      <button v-if="password" v-ripple class="label__input-btn" @click.prevent="show = !show">
        <v-icon v-show="show">
          mdi-eye
        </v-icon>
        <v-icon v-show="!show">
          mdi-eye-off
        </v-icon>
      </button>
    </div>
    <p class="label__label-info" :class="{'label__label-info_error' : !rules}">
      {{ rules ? help : textError }}
    </p>
  </label>
</template>

<script>

export default {
  name: 'BaseLabel',
  props: {
    value: {
      type: [String, Number],
      default: '',
      require: true
    },
    placeholder: {
      type: String,
      default: 'Ввод'
    },
    title: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    },
    textError: {
      type: String,
      default: ''
    },
    rules: {
      type: Boolean,
      default: true
    },
    password: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      valid: false,
      labelError: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  watch: {
    inputValue (value) {
      this.validate(value)
    }
  },
  methods: {
    validate  (login) {
      this.loginError = login.lenght < 3
      this.updateValid()
    },
    updateValid () {
      this.valid = !this.labelError && this.inputValue
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  position: relative;
  display: flex;
  flex-direction: column;

  .label__wrap-input {
    opacity: 0.7;
    @include transition;
  }
  &_active {
    opacity: 1;
    @include transition;
    .label__label-info {
      opacity: 1;
    }
    .label__wrap-input {
      border: 1px solid var(--color-border-1);
      background-color: transparent;
      opacity: 1;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
    }
  }
  &_error {
    .label__wrap-input {
      color: #EA0C0E;
      border-color: #EA0C0E;
    }
    .label__input {
      color: #EA0C0E;
    }
    .label__label-info {
      &_error {
        opacity: 1;
        color: #EA0C0E;
      }
    }
  }
  &:focus-within {
    .label__wrap-input {
    opacity: 1;
    @include transition;
    }
    opacity: 1;
    .label__label-info {
      opacity: 1;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 20px;
    color: var(--color-text-1);
  }
  &__text {
    font-size: sizeIncr(14, 18);
    line-height: 120%;
    color: var(--color-text-1);
  }
  &__label-info {
    position: absolute;
    margin: 0;
    inset: auto auto 0 40px;
    font-size: 10px;
    color: #A6A9B6;
    opacity: 0;
    @include transition;

  }
  &__wrap-input {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 7px;
    padding: 0 40px;
    width: 100%;
    height: 50px;
    border: 1px solid transparent;
    background-color: var(--color-bg-1);
  }
  &__input {
    width: 100%;
    color: var(--color-text-1);
    resize: none;
  }
  &__input-btn {
    position: absolute;
    inset: 0 0 auto auto;
  }
  &__error {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 0 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #EA0C0E;
  }
}
</style>
