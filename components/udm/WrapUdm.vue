<template>
  <div class="wrap">
    <div class="wrap__wrap-top">
      <UdmWFs class=""/>
      <UdmBunkers class="" />
    </div>
    <div class="wrap__wrap-mid">
      <div class="">
      <!-- 1 -->
      </div>
    </div>
    <div class="wrap__wrap-bot">
      <div class="">
      <!-- 1 -->
      </div>
      <div class="">
      <!-- 1 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WrapUdm',
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 6px;
  &__wrap-top {
    display: grid;
    grid-template-columns: 60% 39%;
    height: 20%;
    gap: 6px;
  }
  &__wrap-mid {
    display: grid;
    grid-template-columns: 80% 19%;
    height: 25%;
    gap: 6px;
  }
  &__wrap-bot {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 55%;
    gap: 6px;
  }
}
</style>
