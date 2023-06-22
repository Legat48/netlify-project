<template>
  <div>
    <div class="text-center">
      <v-dialog
        v-model="dialogOpen"
        width="auto"
        content-class="dialog__wrap"
      >
        <v-card>
          <KeepAlive class="app__keep-alive">
            <component
              :is="current"
              class=""
            />
          </KeepAlive>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dialogOpen: {
      get () {
        return this.$store.getters.getDialogOpen
      },
      set () {
        this.$store.commit('toggleDialogOpen')
      }
    },
    current () {
      // return this.$store.getters.getDialogComponent
      return 'PromocodeInput'
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  &__wrap {
    position: relative;
  }
  &__close {
  }
}
</style>
<style lang="scss">
.v-dialog__content--active {
  background-color: rgba(0, 58, 138, 0.3);
  backdrop-filter: blur(5px);
}
</style>
