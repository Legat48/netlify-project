<template>
  <div class="wrap">
    Бункер {{ info.id }}
  </div>
</template>

<script>
export default {
  name: 'UdmBunker',
  props: {
    info: {
      type: Object,
      default: null,
      require: true
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.wrap {

}
</style>
