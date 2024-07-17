<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <div class="content__wrap">
      <WrapUdm />
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
  layout: 'udm-layout',
  async asyncData ({ store }) {
    await store.dispatch('udm/fetchInfo')
    store.commit('header/setHeaderTitle', 'УДМ')
  },
  data () {
    return {
      pageTitle: 'УДМ'
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
    // await this.$store.dispatch('udm/fetchInfo')
    this.$store.commit('setLoading', false)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 6px;
  width: 100%;
  height: calc(100vh - var(--height-header));
  background-color: var(--color-bg-1);
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__wrap {
    width: 100%;
    height: calc(100vh - var(--height-header) - 78px);
    overflow: auto;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
  }
}
</style>
