<template>
  <div v-if="bunker" v-ripple class="bunker btn" :class="{'bunker_active' : bunkerActive}" @click.prevent="addTack()">
    <div class="bunker__number">
      <div class="bunker__number-item">
        № {{ bunker.id }}
      </div>
      <div class="bunker__number-item bunker__number-item_big">
        {{ bunker.fullness }}%
      </div>
    </div>
    <div class="bunker__list">
      <div v-for="substance in bunker.substanceArr" :key="substance.id">
        <div class="">
          {{ substance.name }}:
        </div>
        <div class="">
          {{ substance.weight }}кг
        </div>
      </div>
    </div>
    <div class="bunker__background" :style="`height: ${bunker.fullness}%`" />
  </div>
</template>
<script>
export default {
  name: 'BunkerSecond',
  props: {
    bunker: {
      type: Object,
      require: true,
      default: null
    }
  },
  data () {
    return {
      preload: false
    }
  },
  computed: {
    bunkerActive () {
      return this.$store.getters['acv/getActiveTasks'].idStart === this.bunker.id || this.$store.getters['acv/getActiveTasks'].anchorsArr.find(e => e === this.bunker.id)
    }
  },
  mounted () {
  },
  methods: {
    addTack () {
      if (!this.$store.getters['acv/getActiveTasks'].idStart === this.bunker.id || !this.$store.getters['acv/getActiveTasks'].anchorsArr.find(e => e === this.bunker.id)) {
        this.$store.commit('acv/setActiveIdStart', this.bunker.id)
        this.$store.commit('acv/setActiveAnchorsArr', this.bunker.anchorsArr)
      } else if (this.$store.getters['acv/getActiveTasks'].anchorsArr.find(e => e === this.bunker.id)) {
        const data = {}
        data.idStart = this.$store.getters['acv/getActiveTasks'].idStart
        data.idEnd = this.bunker.id
        data.substanceArr = this.bunker.substanceArr
        this.$store.dispatch('acvModal/setDialogAddTaskObg', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bunker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px;
  border: 4px solid var(--color-border-1);
  border-radius: 5px 5px 25px 25px;
  width: 100%;
  // max-width: 65px;
  height: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  overflow: hidden;
  @include transition;
  &_active {
    box-shadow: 0 0 0 3px var(--color-no-error);
    border-color: var(--color-no-error);
  }
  &__background {
    position: absolute;
    inset: auto 0 0 0;
    width: 100%;
    background-color: var(--color-bg-2);
    z-index: 1;
  }
  &__number {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: sizeIncr(14, 16);
    font-weight: 600;
    width: 100%;
  }
  &__number-item {
    white-space: nowrap;
    &_big {
      font-size: sizeIncr(16, 16);
    }
  }
  &__list {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0 6px;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: sizeIncr(16, 16);

  }
}
</style>
