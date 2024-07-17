<template>
  <div>
    <!-- fetchedAll - всё загружено -->
    <div v-if="true" class="app">
      <!-- <v-navigation-drawer app>
      </v-navigation-drawer> -->
      <UdmHeader class="app__header" />
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
  &__header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 203;
    height: 66px;
  }
  &__main {
    padding-top: 66px;
    height: 100vh;
    max-width: 100vw;
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
