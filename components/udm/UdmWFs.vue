<template>
  <div class="udm-wfs">
    <UdmWF v-for="item of bunkers" :key="item.id" :info="item" class="udm-wfs__item" />
  </div>
</template>

<script>
export default {
  name: 'UdmWFs',
  data () {
    return {
      bunkers: [
        {
          id: 1,
          title: 'Click Me'
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
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
.udm-wfs {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 6px;
  &__item {
    width: 200px;
    height: 100%;
    background-color: wheat;
    border: 2px var(--color-border-1) solid;
  }
}
</style>
