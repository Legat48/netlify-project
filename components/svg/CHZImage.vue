<template>
  <div class="chz">
    <div class="chz__wrap">
      <div v-if="!!converter.hmLotNo || !!converter.hmLadle" class="chz__sub-number" :class="{ 'chz__sub-number_small': small }">
        <span class="chz__text" :class="{ 'chz__text_small': small }">
          №
        </span>
        <span class="chz__text chz__text_big" :class="{ 'chz__text_small': small }">
          {{ converter.hmLadle }}/{{ converter.hmLotNo }}
        </span>
      </div>
      <svg width="327" height="327" viewBox="0 0 327 327" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M293.5 164L83 159.5C83 159.5 71.5178 176.264 63.45 187.354C55.3795 198.441 86.6821 253.647 149.244 281.424C160.455 283.316 293.5 164 293.5 164Z" fill="#E3582C" stroke="#E3582C" stroke-width="2" stroke-miterlimit="10" />
        <path d="M118.57 111.5L183.399 37.1606L188.056 41.8018L60.7415 187.086C60.7415 187.086 53.3791 194.078 59.1675 202.369C64.9533 210.657 78.7231 229.693 95.414 246.329C112.108 262.968 127.888 274.374 137.169 280.582C145.945 286.739 151.522 285.134 155.702 281.536C159.884 277.94 270.173 178.459 270.173 178.459L320.179 165.198L322.576 171.238L274.23 183.565C274.23 183.565 165.035 280.421 159.029 285.315C153.021 290.211 147.648 295.602 133.587 284.971C118.53 273.944 103.338 262.19 91.6324 250.523C79.9295 238.859 56.5167 209.151 52.2586 203.315C48.0005 197.479 50.2829 190.399 56.7534 182.912C59.017 180.288 61.8058 177.021 64.4659 173.884L101.104 131.64L110.999 120.228L118.426 111.666L118.57 111.5Z" fill="#C6C5C1" stroke="#8F9098" stroke-width="2" stroke-miterlimit="10" />
        <path d="M83.8415 126.106C85.7154 125.342 87.1478 124.868 88.9876 124.17C94.2467 122.136 97.4893 127.422 101.104 131.64L100.728 132.074L64.4683 173.887L52.3401 155.621C52.3401 155.621 46.2864 147.596 50.5958 140.345L54.6642 136.263C64.1858 134.576 74.4063 129.955 83.8415 126.106ZM56.3205 148.031C59.2054 150.907 63.6651 146.422 60.7854 143.552C57.9031 140.679 53.4434 145.164 56.3205 148.031Z" fill="#C6C5C1" stroke="#8F9098" stroke-width="2" stroke-miterlimit="10" />
        <path d="M88.5947 84.7955L118.423 111.668L110.996 120.23C106.491 114.016 99.315 111.57 92.3939 113.381C86.3194 115.096 82.9278 120.125 83.8415 126.105C74.4063 129.954 64.1885 134.573 54.6615 136.26L62.2704 128.627C62.2704 128.627 67.5783 123.17 68.301 115.659C69.0238 108.153 71.729 91.0718 75.5088 85.1528C79.2912 79.2363 85.0784 81.6638 88.5947 84.7955ZM79.796 93.56C82.6809 96.4355 87.1406 91.9506 84.261 89.0803C81.376 86.2049 76.9163 90.6898 79.796 93.56Z" fill="#C6C5C1" stroke="#8F9098" stroke-width="2" stroke-miterlimit="10" />
        <path d="M92.394 113.382C99.3177 111.574 106.496 114.016 110.996 120.23L101.101 131.642C97.4867 127.425 94.2441 122.139 88.985 124.172C87.1452 124.871 85.7101 125.347 83.8389 126.108C82.9278 120.126 86.3194 115.096 92.394 113.382Z" fill="#C6C5C1" stroke="#8F9098" stroke-width="2" stroke-miterlimit="10" />
        <path d="M126.708 111.942L188.503 42.2477L192.767 46.4664L68.2291 186.881C68.2291 186.881 60.8825 193.888 66.1471 201.657C71.4117 209.426 83.9627 227.246 99.4166 242.649C114.873 258.055 129.646 268.456 138.35 274.09C146.57 279.694 152 277.941 156.159 274.322C160.319 270.706 267.64 171.024 267.64 171.024L316.557 157.034L319.899 164.541L269.841 177.86C269.841 177.86 159.575 277.433 157.825 278.873C152.989 283.061 147.731 288.032 136.505 279.616C122.985 270.201 106.971 257.144 96.1313 246.34C85.2944 235.539 62.6315 208.727 58.6753 200.046C56.2718 194.966 58.0416 190.452 64.549 183.002C66.8258 180.392 69.6303 177.141 72.3089 174.022L109.15 131.98L119.1 120.623L126.566 112.1L126.708 111.942Z" fill="#864821" stroke="#864821" stroke-width="2" stroke-miterlimit="10" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CHZImage',
  props: {
    converter: {
      type: Object,
      default: null,
      require: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.chz {
  &__wrap {
    position: relative;
  }
  &__number {
    position: absolute;
    inset: 10px auto auto 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    &_small {
    }
  }
  &__icon {
    width: 26px;
    height: 25px;
  }
  &__sub-number {
    position: absolute;
    white-space: nowrap;
    bottom: 72px;
    left: 80px;
    &_small {
      display: none;
    }
   }
  &__text {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 300;
    color: var(--color-text-white-1);
    &_big {
      font-size: 16px;
      font-weight: 500;
    }
    &_small {
      font-size: 14px;
    }
  }
}
</style>
