<template>
  <div class="dropdown">
    <button class="dropdown__btn btn" :class="[{'dropdown__btn_disabled': !drop}, `dropdown__btn_color-border-${colorType}`]" @click="open = !open">
      <svg
        v-if="drop"
        class="dropdown__icon"
        :class="{'dropdown__icon_open': open}"
        width="12.000000"
        height="7.410034"
        viewBox="0 0 12 7.41003"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path id="Vector" d="M1.40991 7.41003L6 2.82996L10.5901 7.41003L12 6L6 0L0 6L1.40991 7.41003Z" fill="#323232" fill-opacity="1.000000" fill-rule="nonzero" />
      </svg>
      <span class="dropdown__btn-text dropdown__btn-text_bold">
        {{ title }}:
      </span>
      <span v-if="(typeof value !== 'object')" class="dropdown__btn-text">
        {{ value }}
      </span>
      <div v-if="methodName && !!scheme && scheme[`${`${title}`.toLowerCase()}`]" class="dropdown__text">
        {{ scheme[`${title}`.toLowerCase()] }}
      </div>
      <div v-if="methodName && !!scheme && scheme[`${value}`.toLowerCase()]" class="dropdown__text">
        {{ scheme[`${value}`.toLowerCase()] }}
      </div>
    </button>
    <template v-if="open && Array.isArray(json)">
      <BaseDropdown
        v-for="(item, index) of json"
        :key="index"
        :method-name="methodName"
        :color-type="colorType + 1"
        :drop="true"
        :json="item ? item : {}"
        :title="`Индекс ${index}`"
      />
    </template>
    <template v-if="open && typeof json === 'object' && !Array.isArray(json)">
      <BaseDropdown
        v-for="(item, key) of json"
        :key="key"
        :color-type="colorType + 1"
        :method-name="methodName"
        :json="item ? item : {}"
        :title="`${key}`"
        :value="Array.isArray(item) ? `Длина массива: ${item.length}` : item"
        :drop="typeof item === 'object' && item !== null"
      />
    </template>
  </div>
</template>

<script>
import infoKeyName from '~/helpers/infoKeyName'

export default {
  props: {
    methodName: {
      type: String,
      default: ''
    },
    json: {
      type: [String, Number, Object, Boolean, Array, null],
      default: null,
      required: true
    },
    colorType: {
      type: Number,
      default: 1
    },
    title: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [String, Number, Object, Boolean, Array, null],
      default: ''
    },
    drop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: true
    }
  },
  computed: {
    scheme () {
      if (this.methodName) {
        return this.$store.getters['smelting/getScheme'][`${this.methodName.toUpperCase()}`].jsonTitle
      }
      return {}
    },
    infoKey () {
      return infoKeyName
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;
  padding-left: 10px;
  &__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 10px;
    border-left: 4px solid var(--color-border-1);
    border-bottom: 1px solid var(--color-border-1);
    min-height: 35px;
    width: 100%;
    text-align: left;
    &_disabled {
      pointer-events: none;
    }
    &_color-border-2 {
      border-left: 4px solid var(--color-border-2);
    }
    &_color-border-3 {
      border-left: 4px solid var(--color-border-3);
    }
    &_color-border-4 {
      border-left: 4px solid var(--color-border-4);
    }
    &_color-border-5 {
      border-left: 4px solid var(--color-border-5);
    }
    &_color-border-6 {
      border-left: 4px solid var(--color-border-6);
    }
    &_color-border-7 {
      border-left: 4px solid var(--color-border-7);
    }
  }
  &__icon {
    width: 12px;
    height: 7px;
    @include transition;
    &_open {
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }
  &__btn-text {
    &_bold {
      font-weight: 500;
    }
  }
  &__text {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 3px;
    font-size: 13px;
    height: 100%;
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
}</style>
