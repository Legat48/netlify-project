<template>
  <div class="card-wrap-mnlz">
    <div v-for="(item, index) in arr" :key="index" class="card-wrap-mnlz__row">
      <h2 class="card-wrap-mnlz__title">
        {{ item.name }}
      </h2>
      <div class="card-wrap-mnlz__card-wrap">
        <CardMnlz
          v-for="(card, cardIndex) in item.settingArr"
          :key="`card${cardIndex}-${item.id}`"
          :id-row="item.id"
          :card-const="card"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    arr () {
      return this.$store.getters['mnlz/getArr']
    }
  }
}
</script>
