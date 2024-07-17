<template>
  <div v-if="bunker" class="bunker " :class="{'bunker_active' : bunkerActive}">
    <div class="bunker__background" :style="`height: ${bunker.fullness}%`" />

    <button class="bunker__wrap btn bunker-anchors" @click.prevent="addTack()">
      <div class="bunker__number">
        <div class="bunker__number-item">
          № <span class="bunker__number-item-big">{{ bunker.id }}</span>
        </div>
        <div class="bunker__number-item">
          <template v-if="!closedActive">
            <span class="bunker__number-item-big">{{ bunker.fullness }}</span>%
          </template>
          <template v-if="closedActive">
            <svg
              class="bunker__closed-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path d="M28 2L2.00004 28" stroke="#323232" stroke-width="3.29174" stroke-linecap="round" />
              <path d="M2 2L28 28" stroke="#323232" stroke-width="3.29174" stroke-linecap="round" />
            </svg>
          </template>
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
    </button>
  </div>
</template>
<script>
export default {
  name: 'BunkerFirst',
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
    },
    closedActive () {
      return this.$store.getters['acv/getActiveTasks'].idStart === this.bunker.id
    }
  },
  mounted () {

  },
  methods: {
    addTack () {
      if (this.$store.getters['acv/getActiveTasks'].idStart === this.bunker.id) {
        this.$store.commit('acv/resetActiveTask')
      } else {
        this.$store.commit('acv/setActiveIdStart', this.bunker.id)
        this.$store.commit('acv/setActiveAnchorsArr', this.bunker.anchorsArr)
        this.$store.commit('acv/setActiveSubstanceArr', this.bunker.substanceArr)
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
    pointer-events: none;
  }
  &__wrap {
    position: relative;
    z-index: 2;
    padding: 3px;
    width: 100%;
    height: 100%;
  }
  &__number {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: sizeIncr(12, 12);
    font-weight: 600;
    width: 100%;
  }
  &__number-item {
    white-space: nowrap;
  }
  &__number-item-big {
    font-size: sizeIncr(17, 17);
  }
  &__closed-icon {
    width: 14px;
    height: 14px;
  }
  &__list {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
