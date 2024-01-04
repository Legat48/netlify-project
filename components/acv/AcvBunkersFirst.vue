<template>
  <div v-if="bunkers" class="bunkers">
    <div v-for="(bunkersGroup, index) in bunkers.bunkersGroupArr" :key="index" class="bunkers__group">
      <template v-for="bunker in bunkersGroup">
        <BunkerFirst v-if="bunker" :key="bunker.id" :bunker="getBunker(bunker)" class="bunkers__bunker" />
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AcvBunkerFirst',
  props: {
    bunkers: {
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
  },
  mounted () {
  },
  methods: {
    getBunker (id) {
      return this.bunkers.bunkersArr.find(e => e.id === id)
    }
  }
}
</script>

<style lang="scss" scoped>
.bunkers {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  &__group {
    display: flex;
    justify-content: center;
    border-right: 2px solid var(--color-border-1);
    gap: 6px;
    padding: 6px;
    width: 100%;
    height: 100%;
  }
}
</style>
