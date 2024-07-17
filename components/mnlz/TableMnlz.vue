<template>
  <table class="table">
    <thead>
      <tr class="table__row table__row_header">
        <th v-for="(header, index) in headers" :key="`header${header.key}${index}`" class="table__item table__item_header">
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, indexRow) in arr" :key="`row${indexRow}`" class="table__row" :class="{ 'table__row_update': within15Minutes(row.date_edit) }">
        <td v-for="(header, indexItem) in headers" :key="`item${indexItem}`" class="table__item">
          <div class="table__item-content">
            <!-- Добавляем условие для вывода типовых данных -->
            <div v-if="header.key.startsWith('type')" class="table__wrap-item">
              <label v-for="(subItem, subIndex) in row[header.key]" :key="`subItem${subIndex}`" class="table__label">
                <div class="table__label-title">
                  {{ getUnit(subIndex).title }} ({{ getUnit(subIndex).dimension }})
                </div>
                <input v-if="editableRow === indexRow" v-model="edits[`${indexRow}-${header.key}-${subIndex}`]" class="table__label-input" @blur="saveEdits(indexRow, header.key, subIndex)" @keyup.enter="saveEdits(indexRow, header.key, subIndex)">
                <div v-else class="table__text">
                  {{ subItem }} {{ getUnit(subIndex).dimension }}
                </div>
              </label>
            </div>
            <div v-else-if="header.key === 'date_edit'" class="table__text">
              {{ createdDate(row[header.key]) }}
            </div>
            <div v-else class="table__text">
              {{ row[header.key] }}
            </div>
            <!-- Возвращаем SVG для управления редактированием -->
            <svg
              v-if="indexItem === headers.length - 1 && editableRow !== indexRow"
              class="table__item-btn table__item-btn_mla btn"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="toggleEdit(indexRow, row)"
            >
              <path d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z" fill="white" />
            </svg>
            <svg
              v-if="indexItem === headers.length - 1 && editableRow === indexRow"
              class="table__item-btn table__item-btn_mla table__item-btn_ok btn"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="toggleEdit(indexRow, row)"
            >
              <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.59L9 16.2Z" fill="white" />
            </svg>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { createdDate } from '~/helpers/createdDate'
import within15Minutes from '~/helpers/within15Minutes'
// Импорты и определение компонента
export default {
  name: 'TableBatch',
  data () {
    return {
      editableRow: null,
      edits: {},
      headers: [
        { key: 'name', name: 'Тип стали' },
        { key: 'abr', name: 'Обозначение' },
        { key: 'type1', name: 'Сечение 900-1300 мм' },
        { key: 'type2', name: 'Сечение 1301-1600 мм' },
        { key: 'type3', name: 'Сечение 1601-1850 мм' },
        { key: 'type4', name: 'Сечение 1851-2200 мм' },
        { key: 'date_edit', name: 'Дата изменения' }
      ]
    }
  },
  computed: {
    arr () {
      return this.$store.getters['mnlz/getArr']
    }
  },
  methods: {
    toggleEdit (indexRow) {
      if (this.editableRow === indexRow) {
        this.saveAllEdits(indexRow)
        this.editableRow = null
      } else {
        this.editableRow = indexRow
        this.edits = {}
        Object.keys(this.arr[indexRow].parameters).forEach((key) => {
          this.edits[`${indexRow}-${key}`] = this.arr[indexRow].parameters[key].value
        })
      }
    },
    saveEdits (indexRow, key) {
      this.$store.commit('mnlz/setArrValue', {
        index: indexRow,
        key: `parameters.${key}.value`,
        value: this.edits[`${indexRow}-${key}`]
      })
    },
    saveAllEdits (indexRow) {
      Object.keys(this.arr[indexRow].parameters).forEach((key) => {
        this.saveEdits(indexRow, key)
      })
    },
    createdDate (date) {
      return createdDate(date)
    },
    within15Minutes (timestamp) {
      return within15Minutes(Number(timestamp))
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  border-collapse: collapse;
  font-size: 14px;
  overflow: auto;
  &__row {
    min-height: 60px;
    border-bottom: 5px solid var(--color-border-1);
    cursor: pointer;
    @include transition;

    // &:hover {
    //   background-color: var(--color-bg-2);
    //   .table__label-title {
    //     background-color: var(--color-bg-2);
    //   }
    // }

    &:active {
      background-color: var(--color-bg-white-1);
      .table__label-title {
        background-color: var(--color-bg-white-1);
      }
    }

    &_disabled {
      pointer-events: none;
    }

    &_header {
      position: sticky;
      inset: -1px 0 auto 0;
      z-index: 3;
      border-bottom: 0px solid var(--color-border-1);
      font-weight: 500;
      background-color: #fff;
      cursor: auto;
    }

    &_update {
      background-color: var(--color-update);
    }
  }
  &__item {
    position: relative;
    min-height: 60px;
    padding: 10px 5px;
    &::before {
      content: '';
      position: absolute;
      inset: auto 0 0 0;
      height: 2px;
      background-color: var(--color-border-1);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0 0 0 auto;
      width: 1px;
      background-color: var(--color-border-1);
      opacity: 0.3;
    }
    &_header {
      user-select: none;
      text-align: left;
      pointer-events: none;
      @include transition;

      &:hover {
        background-color: var(--color-bg-1);
      }

      &:active {
        background-color: var(--color-border-1);
      }
    }
  }

  &__item-btn {
    border: none;
    border-radius: 4px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    background-color: var(--color-btn-1);
    @include transition;

    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 3px var(--color-btn-1);
    }

    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }

    &_mla {
      margin-left: auto;
    }

    &_ok {
      background-color: var(--color-ready);
    }

    &_copy {
      margin-right: 4px;
      width: 30px;
      height: 30px;
      min-width: 30px;
      min-height: 30px;
    }
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;

    &_group {
      min-width: 145px;
    }
  }

  &__text {
    max-width: 170px;
    font-size: 18px;
    font-weight: 500;
    overflow: auto;
  }

  &__status {
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 7px;
    font-weight: 500;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);

    &_1 {
      background-color: var(--color-no-error);
    }

    &_2 {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-2);
    }

    &_3 {
      color: var(--color-text-white-1);

      background-color: var(--color-error);
    }
  }
  &__wrap-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 5px;
    width: 100%;
  }
  &__label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    border-radius: 4px;
    border: 2px solid var(--color-border-1);
    width: 180px;
    padding: 0px 12px;
    height: 40px;
    font-weight: 500;
    background-color: var(--color-btn-white-1);
    @include transition;
    cursor: text;

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    path {
      fill: var(--color-border-1);
    }

    &:focus-within {
      border: 2px solid var(--color-border-3);

      .table__label-input,
      .table__label-title  {
        color: var(--color-border-3);
      }

      path {
        fill: var(--color-border-3);
      }
    }
  }

  &__label-title {
      position: absolute;
      inset: -10px auto auto 6px;
      z-index: 2;
      padding: 0 4px;
      font-size: 12px;
      font-weight: 500;
      background-color: var(--color-text-white-1);
      color: var(--color-border-1);
      @include transition;
  }

  &__search-svg {
    position: relative;
    z-index: 3;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
  }

  &__label-input {
    text-align: left;
    font-size: 16px;
    color: var(--color-text-1);
    cursor: text;
  }
}
</style>
