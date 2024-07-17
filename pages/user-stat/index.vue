<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading && $store.getters['userStat/getStat']" class="content">
    <div class="content__wrap">
      <UserStatWrap />
    </div>
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line require-await
  async asyncData ({ store }) {
    store.commit('setLoading', true)
    store.commit('header/setHeaderTitle', 'Статистика по пользователю')
  },
  data () {
    return {
      pageTitle: 'Статистика по пользователю'
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
    await this.$store.dispatch('userStat/fetchInfo')
    await this.$store.dispatch('userStat/fetchUser')
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
    height: calc(100vh - var(--height-header) - 35px);
    // height: 100%;
    width: 100%;
    border-radius: 4px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: auto;
  }
}
</style>
