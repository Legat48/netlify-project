<template>
  <div v-if="bunkers" class="bunkers">
    <div v-for="(bunker, index) in bunkers.bunkersArr" :key="index" class="bunkers__group">
      <BunkerSecond v-if="bunker" :key="bunker.id" :bunker="bunker" class="bunkers__bunker" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AcvBunkerSecond',
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
  }
}
</script>

<style lang="scss" scoped>
.bunkers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  &__group {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 6px;
    width: 100%;
    height: 100%;
  }
}
</style>
