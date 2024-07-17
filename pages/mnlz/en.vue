<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <BaseMnlz class="content__table" />
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', ' Parameters of the CCM')
  },
  data () {
    return {
      pageTitle: 'ODS | Parameters of the CCM'
    }
  },
  computed: {
  },
  async mounted () {
    await this.$store.commit('mnlz/setArr', [])
    await this.$store.dispatch('mnlz/fetchArr', 'En')
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
    height: calc(100vh - var(--height-header) - 48px);
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: auto;
  }
}
</style>
