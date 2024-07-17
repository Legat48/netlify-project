<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <BaseEq class="content__table" />
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', ' Материалы ВПО')
  },
  data () {
    return {
      pageTitle: 'ОДС | Материалы ВПО',
      methodName: 'GetEQStatus'
    }
  },
  computed: {
  },
  async mounted () {
    await this.$store.dispatch('mnlz/fetchArr')
    await this.$store.dispatch('smelting/fetchScheme')
    await this.$store.dispatch('smelting/fetchStatus', { methodName: this.methodName, paramArr: [{ key: 'timestamp', value: 0 }] })
    this.$store.commit('setLoading', false)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  border-radius: 4px;
  width: 100%;
  height: calc(100vh - var(--height-header));
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__table {
    border-radius: 4px;
    width: 100%;
    height: calc(100vh - var(--height-header) - 35px);
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: auto;
  }
}
</style>
