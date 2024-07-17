<template>
  <div class="table-eq">
    <table class="table-eq__table">
      <thead>
        <tr class="table-eq__row table-eq__row_header">
          <th v-for="(header, index) in headersTA" :key="`header${header.key}${index}`" class="table-eq__th">
            <div class="table-eq__item table-eq__item_header">
              {{ header.name }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in localCard.filter(e => e.eq_type === 7)" :key="index" class="table-eq__row">
          <td
            v-for="{key} in headersTA"
            :key="key"
            class="table-eq__tr"
            :class="generateClassTr(key, row)"
          >
            <div class="table-eq__item" :class="generateClassTr(key, row)">
              {{ typeof row[`${key}`] === 'number' ? outputNumber(row[`${key}`]) : row[`${key}`] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table-eq__table table-eq__table_bunker">
      <thead>
        <tr class="table-eq__row table-eq__row_header">
          <th v-for="(header, index) in headersBunker" :key="`header${header.key}${index}`" class="table-eq__th">
            <div class="table-eq__item table-eq__item_header">
              {{ header.name }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in localCard.filter(e => e.eq_type === 6)" :key="index" class="table-eq__row">
          <td
            v-for="{key} in headersBunker"
            :key="key"
            class="table-eq__tr"
            :class="generateClassTr(key, row)"
          >
            <div class="table-eq__item" :class="generateClassTr(key, row)">
              {{ typeof row[`${key}`] === 'number' ? outputNumber(row[`${key}`]) : row[`${key}`] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { outputNumber } from '~/helpers/numberFormat'

// Импорты и определение компонента
export default {
  name: 'TableEq',
  props: {
    card: {
      type: Object,
      require: true,
      default: null
    }
  },
  data () {
    return {
      editableRow: null,
      random: '1',
      headersBunker: [
        { key: 'eq_name', name: 'Оборудование' },
        { key: 'material_name', name: 'Материал ССМ' },
        { key: 'batch_no', name: 'Партия' },
        { key: 'batch_no_extra', name: 'Номер биг-бэга/Насыпа кюбеля' },
        { key: 'bin_net_wgt', name: 'Вес по документу' },
        { key: 'remain_wgt', name: 'Остаток веса' },
        { key: 'remain_wgt_pim', name: 'Остаток веса по данным ПиМ' }
      ],
      headersTA: [
        { key: 'eq_name', name: 'Оборудование' },
        { key: 'material_name', name: 'Материал ССМ' },
        { key: 'batch_no', name: 'Партия' },
        { key: 'batch_no_extra', name: 'Номер бухты' },
        { key: 'remain_wgt', name: 'Остаток веса (рассчетный)' },
        { key: 'remain_len', name: 'Остаток длины (уровень 2)' },
        { key: 'run_m_wgt', name: 'Масса п/м материала' },
        { key: 'run_m_wgt_fill', name: 'Масса п/м наполнителя' },
        { key: 'coil_net_wgt', name: 'Вес по документу' },
        { key: 'coil_len', name: 'Длина по документу' },
        { key: 'remain_wgt_pim', name: 'Остаток веса по данным ПиМ' },
        { key: 'remain_len_pim', name: 'Остаток длины по данным ПиМ' }
      ],
      localCard: [],
      alertArr: ['batch_no', 'batch_no_extra', 'remain_wgt', 'remain_len', 'run_m_wgt', 'run_m_wgt_fill', 'coil_net_wgt', 'coil_len', 'remain_wgt_pim', 'remain_len_pim'],
      boldClassArr: ['eq_name', 'remain_wgt'],
      rightClassArr: ['remain_wgt', 'remain_len', 'run_m_wgt', 'run_m_wgt_fill', 'coil_net_wgt', 'coil_len', 'remain_wgt_pim', 'remain_len_pim'],
      bigClassArr: ['material_name', 'batch_no'],
      smallClassArr: ['batch_no_extra', 'remain_wgt_pim', 'remain_len_pim']
    }
  },
  computed: {
  },
  mounted () {
    this.localCard = JSON.parse(JSON.stringify(this.card.unit_equipment))
    this.sortedArray()
  },
  methods: {
    submit () {
      if (this.edit) {
        this.$store.commit('eq/editCard', { card: this.card, idRow: this.idRow })
        this.edit = false
      } else {
        this.edit = true
      }
    },
    outputNumber (number) {
      return outputNumber(number)
    },
    selectClass (key, arr, classItem) {
      if (arr.includes(key)) {
        return classItem
      }
      return ''
    },
    sortedArray () { // сортирую массивы для таблиц ТА и бункеров по eq_name
      if (this.localCard && this.localCard.length > 0) {
        this.localCard = this.localCard.sort((a, b) => {
          const aIndex = parseInt(a.eq_name.match(/(\d+)$/)[0], 10)
          const bIndex = parseInt(b.eq_name.match(/(\d+)$/)[0], 10)
          if (a.eq_type === 6) {
            return aIndex - bIndex
          } else {
            return `${a.eq_name}`.localeCompare(`${b.eq_name}`, { numeric: true })
          }
        })
      }
      return this.localCard
    },
    generateClassTr (key, row) {
      const stringArr = []
      if (row[`${key}`] <= 0 && row.material_name !== '[Пусто]' && this.selectClass(key, this.alertArr, 'table-eq__tr_alert')) {
        stringArr.push('table-eq__tr_alert')
      }
      if (this.selectClass(key, this.boldClassArr, 'table-eq__tr_bold')) {
        stringArr.push('table-eq__tr_bold')
      }
      if (this.selectClass(key, this.bigClassArr, 'table-eq__tr_big')) {
        stringArr.push('table-eq__tr_big')
      }
      if (this.selectClass(key, this.smallClassArr, 'table-eq__tr_small')) {
        stringArr.push('table-eq__tr_small')
      }
      if (this.selectClass(key, this.rightClassArr, 'table-eq__item_right')) {
        stringArr.push('table-eq__item_right')
      }
      return stringArr.join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
