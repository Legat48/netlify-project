<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <TableMixer class="content__wrap" />
    <ActualRowMixer class="content__wrap content__wrap_actual" />
    <!-- ?? -->
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>

export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', ' Миксер. Замер темапературы')
  },
  data () {
    return {
      pageTitle: 'ОДС | Миксер. Замер темапературы'
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
  border-radius: 4px;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - var(--height-header));
  background-color: var(--color-bg-white-1);
  &__wrap {
    max-width: 450px;
    width: 100%;
    border-radius: 4px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    &_actual {
      max-width: 380px;
    }
    }
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__table {
    border-radius: 12px;
    width: 100%;
    height: calc(100vh - var(--height-header) - 78px);
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
}
</style>
