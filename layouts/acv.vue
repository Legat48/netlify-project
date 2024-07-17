<template>
  <div>
    <!-- fetchedAll - всё загружено -->
    <div v-if="true" class="app-acv">
      <div class="app-acv__main">
        <Nuxt />
      </div>
    </div>
    <div v-else>
      <div class="app-acv__preloaded">
        <PreLoaded />
      </div>
    </div>
  </div>
</template>
<script>

export default {
}
</script>

<style lang="scss">
.app-acv {
  height: 100vh;
  width: 100%;
  &__header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 203;
    height: var(--height-header);
  }
  &__main {
    width: 100%;
    max-width: 100vw;

  }
  &__preloaded {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
