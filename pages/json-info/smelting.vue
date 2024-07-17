<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <JSONWrap :method-name="methodName" class="content__wrap" />
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>
<script>
/**
  * функция складывующая два числа
  * @param {number} a - первое число
*/
export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', ' JSON по плавке')
  },
  data () {
    return {
      pageTitle: 'ОДС | JSON представление',
      methodName: 'GetHeatData'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
  },
  async mounted () {
    await this.$store.dispatch('smelting/fetchScheme')
    if (this.$route.query.heat) {
      this.$store.commit('smelting/setNumberHeat', this.$route.query.heat)
      await this.$store.dispatch('smelting/fetchInfo', { methodName: this.methodName, paramArr: [{ key: 'timestamp', value: 0 }] })
    }
    this.$store.commit('setLoading', false)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__wrap {
    max-width: 876px;
    width: 100%;
    height: calc(100vh - (var(--height-header) + 4px) - 30px);
    border-radius: 4px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
}
</style>
