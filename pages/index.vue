<!-- eslint-disable vue/html-indent -->
<template>
  <v-app>
    <main class="app">
      <div class="app__wrap">
        <BaseHeader class="app__header" />
        <div class="app__content-wrap">
          <FirstStep v-show="$store.getters.getStatusApp === 1" />
          <SecondStep v-show="$store.getters.getStatusApp === 2" />
          <ThirdStep v-show="$store.getters.getStatusApp === 3" />
          <FourthStep v-show="$store.getters.getStatusApp === 4" />
        </div>
        <BaseFooter v-if="$store.getters.getStatusApp !== 4" class="app__footer" />
      </div>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    current () {
      let value
      if (this.$store.getters.getStatusApp === 2) {
        value = 'SecondStep'
      } else if (this.$store.getters.getStatusApp === 3) {
        value = 'ThirdStep'
      } else if (this.$store.getters.getStatusApp === 4) {
        value = 'FourthStep'
      } else {
        value = 'FirstStep'
      }
      return value
    }
  },
  mounted () {

  },
  methods: {
    submitSucess () {
      this.$store.commit('setStatusApp', 4)
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: rgba(20,22,25,1);
  background: linear-gradient(150deg, rgba(0,191,255,1) 0%, rgba(20,22,25,1) 25%,  rgba(20,22,25,1) 50%,  rgba(20,22,25,1) 75%, rgba(0,191,255,1) 100%);
  &__wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: sizeIncr(8, 27) sizeIncr(8, 75);
    width: sizeIncr(328, 1200);
    max-width: #{$maxvw}px;
    min-height: sizeIncr(608, 743);
    border-radius: 13px;
    background-color: #fff;
  }
  &__content-wrap {
    margin-bottom: auto;
  }
  &__header {
    margin-bottom: sizeIncr(15, 40);
    padding: 0 sizeIncr(0, 22);
  }
  &__header,
  &__footer {
    width: 100%;
  }
  &__amoform {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}

</style>
