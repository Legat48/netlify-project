<template>
  <div>
    <!-- fetchedAll - всё загружено -->
    <v-app v-if="true" class="app">
      <!-- <v-navigation-drawer app>
      </v-navigation-drawer> -->
      <BaseHeader class="app__header" />
      <div class="app__main">
        <Nuxt />
      </div>
    </v-app>
    <v-app v-else>
      <div class="app__preloaded">
        <PreLoaded />
      </div>
    </v-app>
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
  &__header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 203;
    height: var(--height-header);
  }
  &__main {
    padding-top: var(--height-header);
    height: 100vh;
    width: 100%;
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
