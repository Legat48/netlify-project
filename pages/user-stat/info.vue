<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <BaseJSONWrap v-if="$store.getters['userStat/getUser']" :title="'Результат запроса GETUSERLIST'" :json="$store.getters['userStat/getUser']" class="content__wrap" />
    <BaseJSONWrap v-if="$store.getters['userStat/getInfo']" :title="'Результат запроса GETCURRENTSTAT'" :json="$store.getters['userStat/getInfo']" class="content__wrap" />
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</div>
</template>
<script>
export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', ' JSON Статистика по пользователям')
  },
  data () {
    return {
      pageTitle: 'ОДС | JSON Статистика по пользователям'
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
    height: auto;
    border-radius: 4px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
}
</style>
