<template>
  <div>
    <!-- fetchedAll - всё загружено -->
    <div v-if="true" class="app">
      <BaseHeader class="app__header" :block="true" />
      <div class="app__main">
        <Nuxt />
      </div>
    </div>
    <div v-else>
      <div class="app__preloaded">
        <PreLoaded />
      </div>
    </div>
  </div>
</template>
<script>

export default {
}
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  // background-color: var(--color-bg) !important;
  &__base-wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--height-header) 1fr;
    width: 100%;
    height: 100%;
  }

  &__header {
    width: 100%;

  }

  &__main {
    width: 100%;
  }

  &__preloaded {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}</style>
