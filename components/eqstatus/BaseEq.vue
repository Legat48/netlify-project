<template>
  <div class="card-wrap-eq">
    <div v-for="(item, index) in json" :key="index" class="card-wrap-eq__row">
      <h2 class="card-wrap-eq__title">
        {{ newUnitNames.find(unit => unit.oldName === item.unit_name)?.newName || item.unit_name }}
      </h2>
      <TableEq
        :card="item"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newUnitNames: [
        { oldName: 'УДМ-5 ', newName: 'УДМ-5' },
        { oldName: 'УДМ-6 ', newName: 'УДМ-6' },
        { oldName: 'УДМ-7 ', newName: 'УДМ-7' },
        { oldName: 'УДМ-8 ', newName: 'УДМ-8' },
        { oldName: 'Вакууматор-1А', newName: 'АЦВ-1А' },
        { oldName: 'Вакууматор-1Б', newName: 'АЦВ-1Б' },
        { oldName: 'Печь-ковш-3 (тестирование)', newName: 'АПК-3' }
      ]
    }
  },
  computed: {
    json () {
      return this.$store.getters['smelting/getStatus']
    }
  }
}
</script>
