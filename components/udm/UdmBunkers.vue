<template>
  <div class="bunkers">
    <UdmBunker v-for="item of bunkers" :key="item.id" :info="item" class="bunkers__item" />
  </div>
</template>

<script>
export default {
  name: 'UdmBunkers',
  data () {
    return {
      bunkers: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.bunkers {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 6px;
  &__item {
    position: relative;
    width: 250px;
    &::before,
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
      background-color: var(--color-border-1);
      clip-path: polygon(0 0, 100% 0, 100% 65%, 75% 100%, 25% 100%, 0 65%);
    }
    &::after {
      background-color: var(--color-bg-2);
      transform: scale(0.95);
    }
  }
}
</style>
