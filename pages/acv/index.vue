<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <div class="content__wrap">
      <AcvWrap />
    </div>
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
  layout: 'acv',
  async asyncData ({ store }) {
    store.commit('header/setHeaderTitle', 'АЦВ DEMO')
    await store.dispatch('acv/fetchBunkers')
  },
  data () {
    return {
      pageTitle: 'АЦВ'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
  },
  mounted () {
    this.$store.commit('setLoading', false)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 8px;
  width: 100%;
  height: calc(100vh - var(--height-header));
  background-color: var(--color-bg-1);
  // overflow: hidden;
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__wrap {
    width: 100%;
    height: calc(100vh - var(--height-header) - 16px);
    overflow: hidden;
    border-radius: 12px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
  }
}
</style>
