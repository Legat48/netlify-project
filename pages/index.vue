<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <!-- ?? -->
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    this.$store.commit('setLoading', false)
    document.addEventListener('click', (event) => {
      const clickedDialog = event.currentTarget.querySelector('.modal-form')
      if (clickedDialog && event.target === clickedDialog) {
        this.$store.commit('closeDialog')
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 25px 39px;
  width: 100%;
  height: calc(100vh - var(--height-header));
  background-color: var(--color-bg-1);
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
